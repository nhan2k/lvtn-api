import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhonePostDocument = HydratedDocument<PhonePost>;

@Schema()
export class PhonePost {
  @Prop({ type: String, enum: ['Điện thoại'], default: 'Điện thoại' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  statusPhone: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, required: true })
  capacity: string;

  @Prop({ type: String, required: true })
  guarantee: string;
}

export const PhonePostSchema = SchemaFactory.createForClass(PhonePost);
