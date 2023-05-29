import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';

export interface IFavoriteRepository {
  create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
  udpate(id: string, createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
}
