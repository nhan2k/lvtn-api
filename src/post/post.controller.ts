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

  @Patch('countSaw')
  async countSaw(@Body() data: { postId: string }) {
    try {
      return await this.postService.updateCountSaw(data.postId);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get('hotPost')
  async getPostPromoteInHome(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number
  ) {
    try {
      return await this.postService.getPostPromoteInHome({
        pageNumber,
        pageSize,
      });
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get('sort')
  async getAllAndSorting(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @Query('orderBy') orderBy: string
  ) {
    try {
      return await this.postService.getAllAndSorting({
        pageNumber,
        pageSize,
        name,
        orderBy,
      });
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('suggest')
  async getALlSuggests(@Request() req) {
    try {
      return await this.postService.getALlSuggests(req.user.id);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get('search')
  async search(@Query() filter: any) {
    try {
      return await this.postService.search(filter);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files[]'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files,
    @Request() req
  ) {
    try {
      return await this.postService.create(
        createPostDto,
        files,
        req.user.id
      );
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async userFindAll(
    @Query('status') status: string,
    @Query('userId') userId: string,
    @Query('isSelled') isSelled?: boolean
  ) {
    try {
      return await this.postService.userFindAll(
        userId,
        status,
        isSelled
      );
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('unseen')
  async userFindAllPostUnSeen(@Request() req) {
    try {
      return await this.postService.userFindAllPostUnSeen(
        req.user.id
      );
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('admin')
  async adminFindAll(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number
  ) {
    try {
      const filter = {
        pageNumber,
        pageSize,
      };
      return await this.postService.adminFindAll(filter);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get()
  async customerFindAll(
    @Query()
    filter: {
      name?: TCategoryValue;
      province?: string;
      district?: string;
      price?: string;
    }
  ) {
    try {
      return await this.postService.customerFindAll(filter);
    } catch (error) {
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
      return await this.postService.count();
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.postService.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    try {
      return await this.postService.update(id, updatePostDto);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch('promote/:id')
  async promote(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req
  ) {
    try {
      return await this.postService.promote(
        id,
        updatePostDto,
        req.user.id
      );
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }
}
