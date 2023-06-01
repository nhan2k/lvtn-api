import { Injectable } from '@nestjs/common';
import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatGroupRepository } from './repository/chat.repository';
import { map } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatGroupRepository) {}

  async createGroup(createChatDto: CreateChatDto, userId: string) {
    return await this.chatRepository.createGroup(createChatDto, userId);
  }

  findAll(userId: string) {
    return this.chatRepository.getAllGroup(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  async createMessage(createChatDto: CreateMessageDto, userId: string) {
    const response = await this.chatRepository.createMessage(
      createChatDto,
      userId,
    );

    return response;
  }

  async findAllMessagesByGroupId(groupId: string, userId: string) {
    const message = await this.chatRepository.getMessagesByGroupId(
      groupId,
      userId,
    );

    return message as CreateMessageDto[];
  }
}
