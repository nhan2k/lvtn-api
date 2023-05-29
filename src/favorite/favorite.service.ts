import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteRepository } from './repository/favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    try {
      return this.favoriteRepository.create(createFavoriteDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
