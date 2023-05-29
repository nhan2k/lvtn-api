import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
