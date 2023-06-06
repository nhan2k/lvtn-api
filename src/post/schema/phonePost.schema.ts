import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhonePostDocument = HydratedDocument<PhonePost>;

@Schema()
export class PhonePost {
  @Prop({ type: String, enum: ['Điện thoại'], default: 'Điện thoại' })
  typePost: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  statusPhone: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, required: true })
  ram: string;

  @Prop({ type: String, required: true })
  guarantee: string;

  @Prop({ type: Object, required: true })
  address: object;
}

export const PhonePostSchema = SchemaFactory.createForClass(PhonePost);
