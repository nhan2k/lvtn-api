import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repository/post.repository';
import { TCategoryValue } from './types';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(
    createPostDto: CreatePostDto,
    files: any,
    userId: string
  ) {
    try {
      return await this.postRepository.create(
        createPostDto,
        files,
        userId
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async customerFindAll(filter: {
    name?: TCategoryValue;
    province?: string;
    district?: string;
  }) {
    try {
      const response = await this.postRepository.customerFindAll(
        filter.name
      );

      // If province is provided, filter by province
      if (filter.province) {
        return response.filter((res) => {
          for (const key in res) {
            if (key.includes('PostId') && res[key]) {
              return res[key]?.address?.province === filter.province;
            }
          }
        });
      }

      // If district is provided, filter by district
      if (filter.district) {
        return response.filter((res) => {
          for (const key in res) {
            if (key.includes('PostId') && res[key]) {
              return (
                res[key]?.address?.province === filter.province &&
                res[key]?.address?.district === filter.district
              );
            }
          }
        });
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async adminFindAll(filter: {
    pageNumber: number;
    pageSize: number;
  }) {
    try {
      return await this.postRepository.adminFindAll(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async userFindAll(
    userId: string,
    status: string,
    isSelled?: boolean
  ) {
    try {
      return await this.postRepository.userFindAll(
        userId,
        status,
        isSelled
      );
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
      const response = await this.postRepository.search(filter);
      if (filter.district) {
        return response.filter((res) => {
          for (const key in res) {
            if (key.includes('PostId') && res[key]) {
              return (
                res[key].address.province === filter.province &&
                res[key].address.district === filter.district
              );
            }
          }
        });
      }
      if (filter.province) {
        return response.filter((res) => {
          for (const key in res) {
            if (key.includes('PostId') && res[key]) {
              return res[key].address.province === filter.province;
            }
          }
        });
      }
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async promote(
    id: string,
    data: UpdatePostDto,
    userId: string
  ) {
    try {
      return await this.postRepository.promote(id, data, userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Cron
  public async findPostExpiredAndUpdate() {
    try {
      return await this.postRepository.findPostExpiredAndUpdate();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Cron
  async rotatePromotedPosts() {
    try {
      return await this.postRepository.rotatePromotedPosts();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Cron
  async removePromotedPosts() {
    try {
      return await this.postRepository.removePromotedPosts();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getALlSuggests(userId: string) {
    try {
      return await this.postRepository.getALlSuggests(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCountSaw(postId: string) {
    try {
      return await this.postRepository.updateCountSaw(postId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPostPromoteInHome(filter: {
    pageNumber: number;
    pageSize: number;
  }) {
    try {
      return await this.postRepository.getPostPromoteInHome(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllAndSorting(filter: {
    pageNumber: number;
    pageSize: number;
    name: string;
    orderBy: string;
  }) {
    try {
      return await this.postRepository.getAllAndSorting(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
