import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ElectricBicyclePostDocument = HydratedDocument<ElectricBicyclePost>;

@Schema()
export class ElectricBicyclePost {
  @Prop({ type: String, enum: ['Xe điện'], default: 'Xe điện' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  typeElectricBicycle: string;

  @Prop({ type: String, required: true })
  engine: string;

  @Prop({ type: String, required: true })
  statusElectricBicycle: string;

  @Prop({ type: String, required: true })
  guarantee: string;

  @Prop({ type: Object, required: true })
  address: object;
}

export const ElectricBicyclePostSchema =
  SchemaFactory.createForClass(ElectricBicyclePost);
