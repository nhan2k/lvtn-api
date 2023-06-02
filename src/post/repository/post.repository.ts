import { Injectable } from '@nestjs/common';
import { IPostRepository } from './interface.post.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../schema/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ApartmentPost } from '../schema/apartmentPost.schema';
import * as moment from 'moment';
import { CarPost } from '../schema/carPost.schema';
import { GroundPost } from '../schema/groundPost.schema';
import { HousePost } from '../schema/housePost.schema';
import { ElectricBicyclePost } from '../schema/electricBicyclePost.schema';
import { LaptopPost } from '../schema/laptopPost.schema';
import { MotelRoomPost } from '../schema/motelRoomPost.schema';
import { MotorbikePost } from '../schema/motorbikePost.schema';
import { OfficePost } from '../schema/officePost.schema';
import { PhonePost } from '../schema/phonePost.schema';
import { v2 as cloudinary } from 'cloudinary';
import { TCategoryValue } from '../types';
import { UserService } from 'src/user/user.service';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class PostRepository implements IPostRepository {
  @WebSocketServer()
  server: Server;
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(ApartmentPost.name)
    private readonly apartmentPostModel: Model<ApartmentPost>,
    @InjectModel(CarPost.name)
    private readonly carPostModel: Model<CarPost>,
    @InjectModel(GroundPost.name)
    private readonly groundPostModel: Model<GroundPost>,
    @InjectModel(HousePost.name)
    private readonly housePostModel: Model<HousePost>,
    @InjectModel(ElectricBicyclePost.name)
    private readonly electricBicyclePostModel: Model<ElectricBicyclePost>,
    @InjectModel(LaptopPost.name)
    private readonly laptopPostModel: Model<LaptopPost>,
    @InjectModel(MotelRoomPost.name)
    private readonly motelRoomPostModel: Model<MotelRoomPost>,
    @InjectModel(MotorbikePost.name)
    private readonly motorbikePostModel: Model<MotorbikePost>,
    @InjectModel(OfficePost.name)
    private readonly officePostModel: Model<OfficePost>,
    @InjectModel(PhonePost.name)
    private readonly phonePostModel: Model<PhonePost>,

    private readonly userService: UserService,
  ) {
    cloudinary.config({
      cloud_name: 'dtf3ihaqs',
      api_key: '693541471911384',
      api_secret: 'x64161wJ9l6PUG9yAaiu47-yuCU',
    });
  }
  search(keyword: string): Promise<Post[]> {
    try {
      return this.postModel
        .find(
          {
            $text: { $search: keyword },
            status: 'show',
            isReview: true,
          },
          { score: { $meta: 'textScore' } }, // Optional: Include textScore for relevance sorting
        )
        .sort({ score: { $meta: 'textScore' } }) // Optional: Sort by relevance score
        .exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async customerFindAll(categoryName?: TCategoryValue): Promise<Post[]> {
    try {
      switch (categoryName) {
        case 'Chung cư':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'apartmentPostId',
            })
            .exec();
        case 'Xe hơi':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'carPostId',
            })
            .exec();
        case 'Đất':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'groundPostId',
            })
            .exec();
        case 'Nhà ở':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'housePostId',
            })
            .exec();
        case 'Laptop':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'laptopPostId',
            })
            .exec();
        case 'Phòng trọ':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'motelRoomPostId',
            })
            .exec();
        case 'Văn phòng':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'officePostId',
            })
            .exec();
        case 'Xe máy':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'motorbikePostId',
            })
            .exec();
        case 'Xe điện':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'electricBicyclePostId',
            })
            .exec();
        case 'Điện thoại':
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
              categoryName,
            })
            .sort({ updatedAt: 'desc' })
            .populate({
              path: 'phonePostId',
            })
            .exec();
        default:
          return await this.postModel
            .find({
              status: 'show',
              isReview: true,
            })
            .sort({ updatedAt: 'desc' })
            .exec();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async adminFindAll(): Promise<Post[]> {
    try {
      return await this.postModel.find().sort({ updatedAt: 'desc' }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async userFindAll(userId: string, status: string): Promise<Post[]> {
    try {
      return await this.postModel
        .find({
          userId,
          status,
        })
        .sort({ updatedAt: 'desc' })
        .populate({
          path: 'userId',
          select: '-__v -password',
        })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async count(): Promise<number> {
    try {
      return await this.postModel.count().exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findOne(id: string): Promise<Post> {
    try {
      return await this.postModel
        .findById(id)
        .populate({
          path: 'apartmentPostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'carPostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'housePostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'groundPostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'motorbikePostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'officePostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'phonePostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'electricBicyclePostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'motelRoomPostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'laptopPostId',
          select: '-_id -__v',
        })
        .populate({
          path: 'userId',
          select: '-__v -password',
        })
        .exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async create(
    createPostDto: CreatePostDto,
    files: any,
    userId: string,
  ): Promise<Post> {
    try {
      const { title, content, totalPrice, categoryName, ...rest } =
        createPostDto;

      const imgPaths = [];
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
      // const uploadPromises = files.map(async (file) => {
      //   const result = await cloudinary.uploader.upload(file?.path, options);
      //   if (result.public_id) {
      //     imgPaths.push(result.public_id);
      //   }
      // });

      // await Promise.all(uploadPromises);

      const createdPost = new this.postModel({
        title,
        content,
        totalPrice,
        categoryName,
        expiredAt: moment(new Date()).add(60, 'days'),
        imagePath: imgPaths,
        userId: userId,
      });
      const user = await this.userService.findOne(userId);
      await this.userService.update(userId, {
        numberOfposts: user.numberOfposts++,
      });
      this.server.emit('receivedPostApproved', createdPost);
      switch (createPostDto.categoryName) {
        case 'Chung cư':
          const apartmentPost = new this.apartmentPostModel({
            ...rest,
          });
          const apartment = await apartmentPost.save();
          createdPost.apartmentPostId = apartment._id.toString();
          return await createdPost.save();

        case 'Xe hơi':
          const carPost = new this.carPostModel({
            ...rest,
          });
          const car = await carPost.save();

          createdPost.carPostId = car._id.toString();
          return await createdPost.save();

        case 'Đất':
          const groundPost = new this.groundPostModel({
            ...rest,
            area: rest?.width * rest?.height,
          });
          const ground = await groundPost.save();

          createdPost.groundPostId = ground._id.toString();
          return await createdPost.save();
        case 'Nhà ở':
          const housePost = new this.housePostModel({
            ...rest,
            area: rest?.width * rest?.height,
          });
          const house = await housePost.save();

          createdPost.housePostId = house._id.toString();
          return await createdPost.save();

        case 'Laptop':
          const laptopPost = new this.laptopPostModel({
            ...rest,
          });
          const laptop = await laptopPost.save();

          createdPost.laptopPostId = laptop._id.toString();
          return await createdPost.save();
        case 'Phòng trọ':
          const motelRoomPost = new this.motelRoomPostModel({
            ...rest,
          });
          const motelRoom = await motelRoomPost.save();

          createdPost.motelRoomPostId = motelRoom._id.toString();
          return await createdPost.save();
        case 'Văn phòng':
          const officePost = new this.officePostModel({
            ...rest,
          });
          const office = await officePost.save();

          createdPost.officePostId = office._id.toString();
          return await createdPost.save();

        case 'Xe máy':
          const motorbikePost = new this.motorbikePostModel({
            ...rest,
          });
          const motorbike = await motorbikePost.save();

          createdPost.motorbikePostId = motorbike._id.toString();
          return await createdPost.save();

        case 'Xe điện':
          const electricBicyclePost = new this.electricBicyclePostModel({
            ...rest,
          });
          const electricBicycle = await electricBicyclePost.save();

          createdPost.electricBicyclePostId = electricBicycle._id.toString();
          return await createdPost.save();

        case 'Điện thoại':
          const phonePost = new this.phonePostModel({
            ...rest,
          });
          const phone = await phonePost.save();

          createdPost.phonePostId = phone._id.toString();
          return await createdPost.save();
        default:
          break;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const postUpdate = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .populate({
          path: 'userId',
          select: '-_iv -__v',
        })
        .exec();
      console.log(
        '🚀 ~ file: post.repository.ts:443 ~ PostRepository ~ update ~ postUpdate:',
        postUpdate,
      );
      if (updatePostDto.isAdmin) {
        this.server
          .in((postUpdate.userId as any).email)
          .emit('receivedPostApprove', postUpdate);
      }

      return postUpdate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<Post> {
    try {
      return await this.postModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
