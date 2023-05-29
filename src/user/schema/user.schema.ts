import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  fullName: number;

  @Prop({ type: String, unique: true, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['Cá nhân', 'Bán chuyên', 'Cửa hàng'],
    default: 'Cá nhân',
  })
  type: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ type: String, enum: ['active', 'inActive'], default: 'active' })
  status: string;

  @Prop({ type: Object, required: true })
  address: object;

  @Prop({ type: Number, default: 0 })
  numberOfposts: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
