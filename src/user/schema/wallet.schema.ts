import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  @Prop({ type: Number, default: 0 })
  coin: number;

  @Prop({
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  })
  status: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
    unique: true,
  })
  userId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
