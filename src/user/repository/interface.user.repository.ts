import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { User } from '../schema/user.schema';
import { Wallet } from '../schema/wallet.schema';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  register(createUserDto: CreateUserDto): Promise<Boolean>;
  login(createUserDto: CreateUserDto): Promise<{
    access_token: string;
    refresh_token: string;
    role: string;
    email: string;
    _id: string;
  }>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  getWallet(userId: string): Promise<Wallet>;
  addCoin(userId: string, data: UpdateWalletDto): Promise<Wallet>;
}
