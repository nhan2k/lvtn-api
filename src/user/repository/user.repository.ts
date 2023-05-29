import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interface.user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel
        .find({
          role: 'user',
        })
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
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async login(createUserDto: CreateUserDto): Promise<{
    access_token: string;
    refresh_token: string;
    role: string;
    email: string;
  }> {
    try {
      const user = await this.userModel.findOne({
        phoneNumber: createUserDto.phoneNumber,
        status: 'active',
      });
      const isMatch = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );
      if (!isMatch) {
        throw new Error('Credentials invalid');
      }

      const payload = { id: user._id, role: user.role, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
        }),
        role: user.role,
        email: user.email,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async register(createUserDto: CreateUserDto): Promise<Boolean> {
    try {
      const rounds = Number(process.env.ROUND_HASH);
      const salt = await bcrypt.genSalt(rounds);
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const response = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
