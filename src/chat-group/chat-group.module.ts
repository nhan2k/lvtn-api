import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupGateway } from './chat-group.gateway';
import { ChatGroupRepository } from './repository/chat.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schema/group.schema';
import { Message, MessageSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatGroupGateway, ChatGroupService, ChatGroupRepository],
})
export class ChatGroupModule {}
