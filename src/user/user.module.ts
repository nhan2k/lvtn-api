import { SmsService } from 'src/third-service-provider/sms.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './jwtConstant';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { EmailService } from 'src/third-service-provider/mail.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstant,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailService, SmsService],
  exports: [UserService],
})
export class UserModule {}
