import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repository/post.repository';
import { TCategoryValue } from './types';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto, files: any, userId: string) {
    try {
      return await this.postRepository.create(createPostDto, files, userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async customerFindAll(category?: TCategoryValue) {
    try {
      return await this.postRepository.customerFindAll(category);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async adminFindAll() {
    try {
      return await this.postRepository.adminFindAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async userFindAll(userId: string, status: string) {
    try {
      return await this.postRepository.userFindAll(userId, status);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async userFindAllPostUnSeen(userId: string) {
    try {
      return await this.postRepository.userFindAllPostUnSeen(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count() {
    try {
      return await this.postRepository.count();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.postRepository.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return await this.postRepository.update(id, updatePostDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async search(filter: any) {
    try {
      return await this.postRepository.search(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
