import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repository/post.repository';

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

  async findAll() {
    try {
      return await this.postRepository.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async userFindAll(user: any) {
    try {
      return await this.postRepository.userFindAll(user);
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
}
