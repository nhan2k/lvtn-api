import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('verifySendEmail')
  async verifySendEmail(@Request() req: any) {
    try {
      return await this.userService.verifySendEmail(req.user.id);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get('verifyEmail/:id')
  async verifyEmail(@Param('id') userId: string) {
    try {
      return await this.userService.verifyEmail(userId);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('verifySendPhone')
  async verifySendPhone(@Request() req: any) {
    try {
      return await this.userService.verifySendPhone(req.user.id);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Post('verifyPhone/:id')
  async verifyPhone(
    @Param('id') userId: string,
    @Body() opt: { otp: string }
  ) {
    try {
      return await this.userService.verifyPhone(userId, opt.otp);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('payment')
  async getAllPayment() {
    try {
      return await this.userService.getAllPayment();
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('wallet/byUser')
  async getWallet(@Request() req: any) {
    try {
      return await this.userService.getWallet(req.user.id);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch('payment/:id')
  async addCoin(
    @Param('id') id: string,
    @Body() data: UpdateWalletDto
  ) {
    try {
      return await this.userService.addCoin(id, data);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.register(createUserDto);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const token = await this.userService.login(createUserDto);
      response.cookie('SESSIONID', token.access_token, {
        httpOnly: true,
        secure: false,
      });
      return token;
    } catch (error) {
      console.log(
        '🚀 ~ file: user.controller.ts:123 ~ UserController ~ error:',
        error
      );
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('count')
  async count() {
    try {
      return await this.userService.count();
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('count/payment')
  async countPayment() {
    try {
      return await this.userService.countPayment();
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post('payment')
  async createPayment(
    @Request() req: any,
    @Body() createPaymentDto: UpdateWalletDto
  ) {
    try {
      return await this.userService.createPayment(
        req.user.id,
        createPaymentDto
      );
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update/profile')
  async updateProfile(
    @Request() req: any,
    @Body() createPaymentDto: UpdateUserDto
  ) {
    try {
      return await this.userService.updateProfile(
        req.user.id,
        createPaymentDto
      );
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post('suggest')
  async createSuggest(
    @Body() data: { categoryName: string },
    @Request() req
  ) {
    try {
      return await this.userService.createSuggest(req.user.id, data);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }
}
