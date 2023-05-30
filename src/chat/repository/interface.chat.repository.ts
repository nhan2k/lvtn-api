import { CreateChatDto, CreateMessageDto } from '../dto/create-chat.dto';
import { Group } from '../schema/group.schema';
import { Message } from '../schema/message.schema';

export interface IChatGroupRepository {
  createGroup(_id: string, userId: string): Promise<Group>;
  getAllGroup(userId: string): Promise<Group[]>;
  getMessagesByGroupId(groupId: string, userId: string): Promise<Message[]>;
  createMessage(
    createChatDto: CreateMessageDto,
    userId: string,
  ): Promise<Message>;
}
