import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { PostRepository } from './repository/post.repository';
import {
  ApartmentPost,
  ApartmentPostSchema,
} from './schema/apartmentPost.schema';
import { CarPost, CarPostSchema } from './schema/carPost.schema';
import {
  ElectricBicyclePost,
  ElectricBicyclePostSchema,
} from './schema/electricBicyclePost.schema';
import { GroundPost, GroundPostSchema } from './schema/groundPost.schema';
import { HousePost, HousePostSchema } from './schema/housePost.schema';
import { LaptopPost, LaptopPostSchema } from './schema/laptopPost.schema';
import {
  MotelRoomPost,
  MotelRoomPostSchema,
} from './schema/motelRoomPost.schema';
import {
  MotorbikePost,
  MotorbikePostSchema,
} from './schema/motorbikePost.schema';
import { OfficePost, OfficePostSchema } from './schema/officePost.schema';
import { PhonePost, PhonePostSchema } from './schema/phonePost.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: ApartmentPost.name, schema: ApartmentPostSchema },
      { name: CarPost.name, schema: CarPostSchema },
      { name: ElectricBicyclePost.name, schema: ElectricBicyclePostSchema },
      { name: GroundPost.name, schema: GroundPostSchema },
      { name: HousePost.name, schema: HousePostSchema },
      { name: LaptopPost.name, schema: LaptopPostSchema },
      { name: MotelRoomPost.name, schema: MotelRoomPostSchema },
      { name: MotorbikePost.name, schema: MotorbikePostSchema },
      { name: OfficePost.name, schema: OfficePostSchema },
      { name: PhonePost.name, schema: PhonePostSchema },
    ]),
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService, PostModule],
})
export class PostModule {}
