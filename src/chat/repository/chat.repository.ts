import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChatGroupRepository } from './interface.chat.repository';
import { Group } from '../schema/group.schema';
import { Message } from '../schema/message.schema';
import { CreateChatDto, CreateMessageDto } from '../dto/create-chat.dto';

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
    try {
      const message = await this.chatMessageModel.create({
        ...createChatDto,
        userId: userId,
      });

      return (await message.save()).populate('userId');
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
        .sort({ updatedAt: 'asc' })
        .populate({
          path: 'userId',
          select: '-__v -password',
        })
        .exec();

      let messageMiss = await this.chatMessageModel.find({
        groupId,
        isSeen: false,
      });
      if (messageMiss.length > 0) {
        const updatePromises = messageMiss.map(async (message) => {
          if (userId !== message?.userId) {
            await this.chatMessageModel.findByIdAndUpdate(message._id, {
              isSeen: true,
            });
          }
        });
        await Promise.all(updatePromises);
      }

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
        .sort({ updatedAt: 'desc' })
        .populate('sellerId')
        .populate('buyerId')
        .populate({
          path: 'postId',
          populate: {
            path: 'userId',
            select: '-__v -password',
          },
        })
        .exec();

      return groupFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createGroup(
    createChatDto: CreateChatDto,
    userId: string,
  ): Promise<Group> {
    try {
      const groupFind = await this.chatGroupModel.findOne({
        buyerId: userId,
        ...createChatDto,
      });

      if (groupFind) {
        return groupFind;
      }

      const group = new this.chatGroupModel({
        buyerId: userId,
        ...createChatDto,
      });

      return await group.save();
    } catch (error) {
      throw new Error(error);
    }
  }
}
