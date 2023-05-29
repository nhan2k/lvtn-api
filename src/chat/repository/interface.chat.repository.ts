import { CreateChatDto } from '../dto/create-chat.dto';

export interface IChatGroupRepository {
  chat(): Promise<any>;
  notify(): Promise<any>;
}
