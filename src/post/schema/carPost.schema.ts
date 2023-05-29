import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarPostDocument = HydratedDocument<CarPost>;

@Schema()
export class CarPost {
  @Prop({ type: String, enum: ['Xe hơi'], default: 'Xe hơi' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: Number, required: true })
  yearOfManufacture: number;

  @Prop({ type: String, required: true })
  carGearbox: string;

  @Prop({ type: String, required: true })
  fuel: string;

  @Prop({ type: Number, required: true })
  numberOfSeats: number;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, enum: ['Mới', 'Đã sử dụng'], required: true })
  statusCar: string;

  @Prop({ type: Number, required: true })
  numberOfKM: number;
}

export const CarPostSchema = SchemaFactory.createForClass(CarPost);
