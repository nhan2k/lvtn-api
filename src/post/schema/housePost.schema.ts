import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HousePostDocument = HydratedDocument<HousePost>;

@Schema()
export class HousePost {
  @Prop({ type: String, enum: ['Nhà ở'], default: 'Nhà ở' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  codeHouse: string;

  @Prop({ type: String, required: true })
  typeHouse: string;

  @Prop({ type: Object, required: true })
  address: object;

  @Prop({ type: String, required: true })
  block: string;

  @Prop({ type: Number, required: true })
  numberOfFloor: Number;

  @Prop({ type: Number, default: 0 })
  numberOfBedroom: number;

  @Prop({ type: Number, default: 0 })
  numberOfBathroom: number;

  @Prop({ type: String, default: null })
  doorDirection: string;

  @Prop({ type: String, required: true })
  interiorCondition: string;

  @Prop({ type: String, default: null })
  juridical: string;

  @Prop({ type: Number, default: null })
  area: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  width: number;
}

export const HousePostSchema = SchemaFactory.createForClass(HousePost);
