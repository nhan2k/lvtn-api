import { CreateChatGroupDto } from '../dto/create-chat-group.dto';

export interface IChatGroupRepository {
  chat(): Promise<any>;
  notify(): Promise<any>;
}
