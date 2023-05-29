import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApartmentPostDocument = HydratedDocument<ApartmentPost>;

@Schema()
export class ApartmentPost {
  @Prop({ type: String, enum: ['Chung cư'], default: 'Chung cư' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  nameOfBuilding: string;

  @Prop({ type: Object, required: true })
  address: object;

  @Prop({ type: String, required: true })
  codeOfBuilding: string;

  @Prop({ type: String, required: true })
  block: string;

  @Prop({ type: Number, required: true })
  floor: Number;

  @Prop({ type: String, required: true })
  typeOfBuilding: string;

  @Prop({ type: Number, default: 0 })
  numberOfBedroom: number;

  @Prop({ type: Number, default: 0 })
  numberOfBathroom: number;

  @Prop({ type: String, default: null })
  balconnyDirection: string;

  @Prop({ type: String, default: null })
  doorDirection: string;

  @Prop({ type: String, required: true })
  interiorCondition: string;

  @Prop({ type: String, default: null })
  juridical: string;

  @Prop({ type: Number, required: true })
  area: number;
}

export const ApartmentPostSchema = SchemaFactory.createForClass(ApartmentPost);
