import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MotorbikePostDocument = HydratedDocument<MotorbikePost>;

@Schema()
export class MotorbikePost {
  @Prop({ type: String, enum: ['Xe máy'], default: 'Xe máy' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: Number, required: true })
  yearOfManufacture: number;

  @Prop({ type: String, required: true })
  typeMotorbike: string;

  @Prop({ type: String, required: true })
  capacity: string;

  @Prop({ type: String, required: true })
  statusMotorbike: string;

  @Prop({ type: Number, required: true })
  numberOfKM: number;

  @Prop({ type: String, required: true })
  origin: string;

  @Prop({ type: Object, required: true })
  address: object;
}

export const MotorbikePostSchema = SchemaFactory.createForClass(MotorbikePost);
