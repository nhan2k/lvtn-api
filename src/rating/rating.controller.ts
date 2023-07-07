import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Query,
  Get,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createRatingDto: CreateRatingDto) {
    try {
      return this.ratingService.create(createRatingDto);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get()
  getAll(@Query('userId') userId: string) {
    try {
      return this.ratingService.getAll(userId);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }

  @Get('avg')
  getRatingAvg(@Query('userId') userId: string) {
    try {
      return this.ratingService.getRatingAvg(userId);
    } catch (error) {
      throw new BadRequestException(
        'Something bad happened',
        error.message
      );
    }
  }
}
