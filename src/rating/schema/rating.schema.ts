import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type RatingDocument = HydratedDocument<Rating>;

@Schema()
export class Rating {
  @Prop({ type: Number, default: 0 })
  rate: number;

  @Prop({ type: String })
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userTargetId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'Post',
  })
  postId: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
