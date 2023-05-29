import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ type: String, default: null })
  text: string;

  @Prop({ type: String, default: null })
  filePath: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'Group',
  })
  groupId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
