import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop({
    type: Array<SchemaTypes.Types.ObjectId>,
    ref: 'User',
  })  
  group: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
