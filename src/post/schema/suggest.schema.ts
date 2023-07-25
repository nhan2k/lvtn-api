import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type SuggestDocument = HydratedDocument<Suggest>;

@Schema()
export class Suggest {
  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'Post',
  })
  postId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

const SuggestSchema = SchemaFactory.createForClass(Suggest);
export { SuggestSchema };
