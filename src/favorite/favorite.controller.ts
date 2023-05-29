import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    try {
      return this.favoriteService.create(createFavoriteDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', error.message);
    }
  }
}
