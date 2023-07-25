import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ type: Number, default: 0 })
  coin: number;

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'denined'],
    default: 'pending',
  })
  status: string;

  @Prop({
    type: String,
    nullable: true,
  })
  reason: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
