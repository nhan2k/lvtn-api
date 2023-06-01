import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupGateway } from './chat-group.gateway';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [ChatGroupGateway, ChatGroupService],
})
export class ChatGroupModule {}
