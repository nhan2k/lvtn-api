import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficePostDocument = HydratedDocument<OfficePost>;

@Schema()
export class OfficePost {
  @Prop({ type: String, enum: ['Văn phòng'], default: 'Văn phòng' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  nameOfBuilding: string;

  @Prop({ type: String, required: true })
  codeOfBuilding: string;

  @Prop({ type: Object, required: true })
  address: object;

  @Prop({ type: String, required: true })
  block: string;

  @Prop({ type: Number, required: true })
  floor: Number;

  @Prop({ type: String, required: true })
  typeOffice: string;

  @Prop({ type: String, default: null })
  doorDirection: string;

  @Prop({ type: String, required: true })
  interiorCondition: string;

  @Prop({ type: String, default: null })
  juridical: string;

  @Prop({ type: Number, default: null })
  area: number;
}

export const OfficePostSchema = SchemaFactory.createForClass(OfficePost);
