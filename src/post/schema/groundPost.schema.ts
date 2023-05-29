import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroundPostDocument = HydratedDocument<GroundPost>;

@Schema()
export class GroundPost {
  @Prop({ type: String, enum: ['Đất'], default: 'Đất' })
  typePost: string;

  @Prop({ type: String, enum: ['Cần bán', 'Cho thuê'], required: true })
  type: string;

  @Prop({ type: String, required: true })
  typeGround: string;

  @Prop({ type: Object, required: true })
  address: object;

  @Prop({ type: String, default: null })
  groundDirection: string;

  @Prop({ type: String, default: null })
  juridical: string;

  @Prop({ type: Number, default: null })
  area: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  width: number;
}

export const GroundPostSchema = SchemaFactory.createForClass(GroundPost);
