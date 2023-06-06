import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LaptopPostDocument = HydratedDocument<LaptopPost>;

@Schema()
export class LaptopPost {
  @Prop({ type: String, enum: ['Laptop'], default: 'Laptop' })
  typePost: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  microProcessor: string;

  @Prop({ type: String, required: true })
  statusLaptop: string;

  @Prop({ type: String, required: true })
  ram: string;

  @Prop({ type: String, required: true })
  hardware: string;

  @Prop({ type: String, required: true })
  typeHardware: string;

  @Prop({ type: Object, required: true })
  guarantee: object;

  @Prop({ type: Object, required: true })
  address: object;
}

export const LaptopPostSchema = SchemaFactory.createForClass(LaptopPost);
