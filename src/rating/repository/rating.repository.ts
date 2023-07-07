import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRatingRepository } from './interface.rating.repository';
import { Rating } from '../schema/rating.schema';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { RatingAvg } from '../schema/ratingAvg.schema';

@Injectable()
export class RatingRepository implements IRatingRepository {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<Rating>,
    @InjectModel(RatingAvg.name)
    private readonly ratingAvgModel: Model<RatingAvg>
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    try {
      const createdRating = await this.ratingModel.create(
        createRatingDto
      );

      const ratingFind = await this.ratingAvgModel.findOne({
        userId: createRatingDto.userTargetId,
      });
      if (ratingFind) {
        ratingFind.count += 1;
        ratingFind.rateAvg = Math.round(
          (ratingFind.rateAvg + createRatingDto.rate) /
            ratingFind.count
        );

        await ratingFind.save();
      } else {
        await this.ratingAvgModel.create({
          rateAvg: createRatingDto.rate,
          count: 1,
          userId: createRatingDto.userTargetId,
        });
      }
      return await createdRating.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll(userId: string): Promise<Rating[]> {
    try {
      const createdRating = this.ratingModel
        .find({
          userTargetId: userId,
        })
        .populate({
          path: 'postId',
          select: 'title',
        })
        .populate({
          path: 'userId',
          select: 'fullName',
        })
        .sort({ createdAt: -1 });
      return await createdRating;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getRatingAvg(userId: string): Promise<RatingAvg> {
    try {
      const ratingAvg = await this.ratingAvgModel
        .findOne({
          userId,
        })
        .select('rateAvg count');

      return ratingAvg;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
