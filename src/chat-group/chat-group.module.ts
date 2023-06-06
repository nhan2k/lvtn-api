import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupGateway } from './chat-group.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [ChatModule, PostModule],
  providers: [ChatGroupGateway, ChatGroupService],
})
export class ChatGroupModule {}
