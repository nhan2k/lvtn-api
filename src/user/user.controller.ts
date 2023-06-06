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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.register(createUserDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const token = await this.userService.login(createUserDto);
      response.cookie('SESSIONID', token.access_token, {
        httpOnly: true,
        secure: false,
      });
      return token;
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('count')
  async count() {
    try {
      return await this.userService.count();
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }
}
