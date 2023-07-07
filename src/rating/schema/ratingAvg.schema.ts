import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type RatingDocument = HydratedDocument<RatingAvg>;

@Schema()
export class RatingAvg {
  @Prop({ type: Number, default: 0 })
  rateAvg: number;

  @Prop({ type: Number, default: 0 })
  count: number;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userId: string;
}

export const RatingAvgSchema =
  SchemaFactory.createForClass(RatingAvg);
