import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostService } from 'src/post/post.service';

@Injectable()
export class TaskService {
  constructor(private readonly postService: PostService) {}

  @Cron('0 0 * * * *')
  async handleCron() {
    try {
      await this.postService.findPostExpiredAndUpdate();
    } catch (error) {
      throw new Error(error);
    }
  }
}
