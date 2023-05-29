import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRatingRepository } from './interface.rating.repository';
import { Rating } from '../schema/rating.schema';
import { CreateRatingDto } from '../dto/create-rating.dto';

@Injectable()
export class RatingRepository implements IRatingRepository {
  constructor(
    @InjectModel(Rating.name) private readonly RatingModel: Model<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    try {
      const createdRating = new this.RatingModel(createRatingDto);
      return await createdRating.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
