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

  // @Cron('*/10 * * * * *')
  @Cron('*/10 * * * *')
  async handleCronRotatePromotedPosts() {
    try {
      await this.postService.rotatePromotedPosts();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Cron('0 0 */1 * *')
  async handleCronRemovePromotedPosts() {
    try {
      await this.postService.removePromotedPosts();
    } catch (error) {
      throw new Error(error);
    }
  }
}
