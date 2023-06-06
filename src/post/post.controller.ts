import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Request,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TCategoryValue } from './types';

@Controller('post')
export class PostController {
  @WebSocketServer()
  server: Server;

  constructor(private readonly postService: PostService) {}

  @Get('search')
  async search(@Query() filter: any) {
    try {
      return await this.postService.search(filter);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files[]'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files,
    @Request() req,
  ) {
    try {
      return await this.postService.create(createPostDto, files, req.user.id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async userFindAll(@Request() req, @Query('status') status: string) {
    try {
      return await this.postService.userFindAll(req.user.id, status);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('unseen')
  async userFindAllPostUnSeen(@Request() req) {
    try {
      return await this.postService.userFindAllPostUnSeen(req.user.id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('admin')
  async adminFindAll() {
    try {
      return await this.postService.adminFindAll();
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @Get()
  async customerFindAll(@Query('name') category?: TCategoryValue) {
    try {
      return await this.postService.customerFindAll(category);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get('count')
  async count() {
    try {
      return await this.postService.count();
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.postService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return await this.postService.update(id, updatePostDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }
}
