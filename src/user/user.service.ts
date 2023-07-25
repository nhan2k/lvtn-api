import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.register(createUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.login(createUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllSuggests(categoryName: string, userId: string) {
    try {
      return await this.userRepository.findAllSuggests(
        categoryName,
        userId
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count() {
    try {
      return await this.userRepository.count();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async countPayment() {
    try {
      return await this.userRepository.countPayment();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getWallet(id: string) {
    try {
      return await this.userRepository.getWallet(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserWalletAndCalculate(userId: string, coin: number) {
    try {
      return await this.userRepository.getUserWalletAndCalculate(
        userId,
        coin
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addCoin(id: string, data: UpdateWalletDto) {
    try {
      return await this.userRepository.addCoin(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPayment(id: string, data: UpdateWalletDto) {
    try {
      return await this.userRepository.createPayment(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllPayment() {
    try {
      return await this.userRepository.getAllPayment();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePayment(data: { status: string }) {
    try {
      return await this.userRepository.getAllPayment();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifySendEmail(userId: string) {
    try {
      return await this.userRepository.verifyEmail(
        userId,
        'sendMailVerify'
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyEmail(userId: string) {
    try {
      return await this.userRepository.verifyEmail(
        userId,
        'verifyEmail'
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifySendPhone(userId: string) {
    try {
      return await this.userRepository.verifyPhone(
        userId,
        'sendPhoneVerify'
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyPhone(userId: string, otp?: string) {
    try {
      return await this.userRepository.verifyPhone(
        userId,
        'verifyPhone',
        otp
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProfile(
    userId: string,
    createPaymentDto: UpdateUserDto
  ) {
    try {
      return await this.userRepository.updateProfile(
        userId,
        createPaymentDto
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async createSuggest(
    userId: string,
    data: { categoryName: string }
  ) {
    try {
      return await this.userRepository.createSuggest(userId, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
