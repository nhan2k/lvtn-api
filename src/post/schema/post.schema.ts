import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaTypes } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({ type: String, required: true })
  content: number;

  @Prop({ type: [String], default: null })
  imagePath: string[];

  @Prop({
    type: String,
    enum: ['hide', 'show', 'expired', 'denined'],
    default: 'hide',
  })
  status: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isReview: boolean;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Date, default: null })
  expiredAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({
    type: String,
    enum: [
      'Chung cư',
      'Xe hơi',
      'Nhà ở',
      'Đất',
      'Xe máy',
      'Văn phòng',
      'Điện thoại',
      'Xe điện',
      'Phòng trọ',
      'Laptop',
    ],
  })
  categoryName: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'ApartmentPost',
    default: null,
  })
  apartmentPostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'CarPost',
    default: null,
  })
  carPostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'HousePost',
    default: null,
  })
  housePostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'GroundPost',
    default: null,
  })
  groundPostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'MotorbikePost',
    default: null,
  })
  motorbikePostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'OfficePost',
    default: null,
  })
  officePostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'PhonePost',
    default: null,
  })
  phonePostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'ElectricBicyclePost',
    default: null,
  })
  electricBicyclePostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'MotelRoomPost',
    default: null,
  })
  motelRoomPostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'LaptopPost',
    default: null,
  })
  laptopPostId: string;

  @Prop({
    type: SchemaTypes.Types.ObjectId,
    ref: 'User',
  })
  userId: string;
}

const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ title: 'text', content: 'text' });
export { PostSchema };
