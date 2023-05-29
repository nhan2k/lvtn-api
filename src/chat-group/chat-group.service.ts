import { Injectable } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
import { UpdateChatGroupDto } from './dto/update-chat-group.dto';
import { ChatGroupRepository } from './repository/chat.repository';

@Injectable()
export class ChatGroupService {
  constructor(private readonly chatRepository: ChatGroupRepository) {}

  async chat() {
    try {
      return await this.chatRepository.chat();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async notify() {
    try {
      return await this.chatRepository.notify();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
