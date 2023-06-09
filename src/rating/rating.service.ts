import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingRepository } from './repository/rating.repository';

@Injectable()
export class RatingService {
  constructor(private readonly ratingRepository: RatingRepository) {}

  create(createRatingDto: CreateRatingDto) {
    try {
      return this.ratingRepository.create(createRatingDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getAll(userId: string) {
    try {
      return this.ratingRepository.getAll(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getRatingAvg(userId: string) {
    try {
      return this.ratingRepository.getRatingAvg(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
