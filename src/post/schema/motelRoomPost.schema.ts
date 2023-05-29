import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MotelRoomPostDocument = HydratedDocument<MotelRoomPost>;

@Schema()
export class MotelRoomPost {
  @Prop({ type: String, enum: ['Phòng trọ'], default: 'Phòng trọ' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: Object, required: true })
  address: object;

  @Prop({ type: String, required: true })
  interiorCondition: string;

  @Prop({ type: Number, required: true })
  area: number;

  @Prop({ type: Number, required: true })
  deposit: number;
}

export const MotelRoomPostSchema = SchemaFactory.createForClass(MotelRoomPost);
