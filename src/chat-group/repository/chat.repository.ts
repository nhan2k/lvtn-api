import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatGroupRepository } from './interface.chat.repository';
import { Group } from '../schema/group.schema';
import { Message } from '../schema/message.schema';

@Injectable()
export class ChatGroupRepository implements IChatGroupRepository {
  constructor(
    @InjectModel(Group.name)
    private readonly ChatGroupModel: Model<Group>,
    @InjectModel(Message.name)
    private readonly ChatMessageModel: Model<Message>,
  ) {}
  async chat(): Promise<any> {
    return await 'test';
  }
  async notify(): Promise<any> {
    return await this.ChatMessageModel.create({
      groupId: '64665bb3dc98982584fff3fd',
      text: 'Hello',
    });
  }
}
