import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    try {
      return this.ratingService.create(createRatingDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }
}
