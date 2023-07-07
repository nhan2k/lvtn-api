import { Wallet } from '../schema/wallet.schema';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interface.user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { Payment } from '../schema/payment.schema';
import { EmailService } from 'src/third-service-provider/mail.service';
import { SmsService } from 'src/third-service-provider/sms.service';
import { generateOTP } from '../utils';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<Payment>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel
        .find({
          role: 'user',
        })
        .sort({ updatedAt: 'desc' })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async count(): Promise<number> {
    try {
      return await this.userModel
        .count({
          role: 'user',
        })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel
        .findById(id)
        .select('-password')
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async login(createUserDto: CreateUserDto): Promise<{
    access_token: string;
    refresh_token: string;
    role: string;
    email: string;
    _id: string;
  }> {
    try {
      const user = await this.userModel.findOne({
        phoneNumber: createUserDto.phoneNumber,
        status: 'active',
      });
      const isMatch = await bcrypt.compare(
        createUserDto.password,
        user.password
      );
      if (!isMatch) {
        throw new Error('Credentials invalid');
      }
      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
        }),
        role: user.role,
        email: user.email,
        _id: user._id.toString(),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async register(createUserDto: CreateUserDto): Promise<Boolean> {
    try {
      const rounds = Number(process.env.ROUND_HASH);
      const salt = await bcrypt.genSalt(rounds);
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        salt
      );
      createUserDto.phoneNumber =
        '+84' + createUserDto.phoneNumber.slice(1);
      const createdUser = new this.userModel(createUserDto);
      const wallet = await this.walletModel.create({
        userId: createdUser._id,
      });
      await wallet.save();
      const opt = generateOTP();
      await this.smsService.sendOtp(createdUser.phoneNumber, opt);

      await createdUser.save();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    try {
      const response = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getWallet(userId: string): Promise<Wallet> {
    try {
      return await this.walletModel
        .findOne({
          userId,
        })
        .select('coin');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addCoin(id: string, data: UpdateWalletDto): Promise<Payment> {
    try {
      const payment = await this.paymentModel
        .findByIdAndUpdate(id, data, { new: true })
        .populate({
          path: 'userId',
          select: 'email',
        })
        .exec();
      const wallet = await this.walletModel.findOne({
        userId: payment?.userId,
      });
      await this.walletModel.findOneAndUpdate(
        {
          userId: payment?.userId,
        },
        {
          $set: { coin: wallet?.coin + payment?.coin },
        }
      );

      if (payment.reason) {
        await this.emailService.sendEmail(
          (payment?.userId as any)?.email,
          'Giao dịch của bạn đã bị từ chối',
          data.reason
        );
      }

      await this.emailService.sendEmail(
        (payment?.userId as any)?.email,
        'Giao dịch của bạn đã được duyệt',
        'Vui lòng kiểm tra tài khoản đồng tốt để xem số dư mới cập nhật'
      );

      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllWallet(): Promise<Wallet[]> {
    try {
      return await this.walletModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllPayment(): Promise<any[]> {
    try {
      return await this.paymentModel.find().populate({
        path: 'userId',
        select: 'phoneNumber',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPayment(
    userId: string,
    data: UpdateWalletDto
  ): Promise<Payment> {
    try {
      const payment = await this.paymentModel.create({
        userId,
        ...data,
      });
      const user = await this.userModel
        .findById(userId)
        .select('email')
        .exec();

      await this.emailService.sendEmail(
        user?.email,
        'Giao dịch của bạn đang được hệ thống kiểm duyệt duyệt',
        'Vui lòng cập nhật mail của bạn để xem thông báo mới nhất'
      );

      return await payment.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserWalletAndCalculate(
    userId: string,
    coin: number
  ): Promise<void> {
    try {
      const payemnt = await this.walletModel.findOne({
        userId,
      });

      if (coin > payemnt.coin) {
        throw new Error('Not enough coin');
      }

      payemnt.coin = payemnt.coin - coin;

      await payemnt.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyEmail(
    userId: string,
    option: string
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new Error('Not found user');
      }

      if (option === 'sendMailVerify') {
        await this.emailService.sendEmail(
          user.email,
          'Xác thực email trên TinTot',
          `<h4>Xác thực email từ tài khoản ${user.phoneNumber}.</h4> <p>Bấm vào link dưới đây để tiến hành xác thực.</p> <p><a href="http://localhost:4200/verifyEmail?id=${userId}">Link</a></p>`
        );
        return true;
      }
      await this.userModel.findByIdAndUpdate(userId, {
        $set: { emailVerified: true },
      });

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProfile(
    userId: string,
    createPaymentDto: UpdateUserDto
  ): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        createPaymentDto,
        { new: true }
      );

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
