import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PostModule],
  providers: [TaskService],
})
export class TaskModule {}
