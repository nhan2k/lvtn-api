import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite {
  @Prop({ type: Number, default: 0 })
  count: number;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'Post',
  })
  postId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
