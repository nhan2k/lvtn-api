import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schema/user.schema';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  register(createUserDto: CreateUserDto): Promise<Boolean>;
  login(createUserDto: CreateUserDto): Promise<{
    access_token: string;
    refresh_token: string;
    role: string;
    email: string;
  }>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
}
