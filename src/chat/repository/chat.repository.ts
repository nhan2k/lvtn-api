import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatGroupRepository } from './interface.chat.repository';
import { Group } from '../schema/group.schema';
import { Message } from '../schema/message.schema';
import { CreateMessageDto } from '../dto/create-chat.dto';

@Injectable()
export class ChatGroupRepository implements IChatGroupRepository {
  constructor(
    @InjectModel(Group.name)
    private readonly chatGroupModel: Model<Group>,
    @InjectModel(Message.name)
    private readonly chatMessageModel: Model<Message>,
  ) {}
  async createMessage(
    createChatDto: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    console.log(
      '🚀 ~ file: chat.repository.ts:21 ~ ChatGroupRepository ~ userId:',
      userId,
    );
    try {
      const message = await this.chatMessageModel.create({
        ...createChatDto,
        userId: userId,
      });
      console.log(
        '🚀 ~ file: chat.repository.ts:30 ~ ChatGroupRepository ~ message:',
        message,
      );

      return await message.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMessagesByGroupId(
    groupId: string,
    userId: string,
  ): Promise<Message[]> {
    try {
      let messages = await this.chatMessageModel
        .find({
          groupId,
        })
        .sort({ createdAt: 'asc' })
        .populate('userId')
        .exec();

      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllGroup(userId: string): Promise<Group[]> {
    try {
      const groupFind = await this.chatGroupModel
        .find({
          $or: [
            {
              buyerId: userId,
            },
            {
              sellerId: userId,
            },
          ],
        })
        .populate('sellerId')
        .populate('buyerId')
        .exec();

      return groupFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createGroup(_id: string, userId: string): Promise<Group> {
    try {
      const groupFind = await this.chatGroupModel.findOne({
        buyerId: userId,
        sellerId: _id,
      });

      if (groupFind) {
        return groupFind;
      }

      const group = new this.chatGroupModel({
        buyerId: userId,
        sellerId: _id,
      });

      return await group.save();
    } catch (error) {
      throw new Error(error);
    }
  }
}
