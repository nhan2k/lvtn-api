import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFavoriteRepository } from './interface.favorite.repository';
import { Favorite } from '../schema/favorite.schema';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
  constructor(
    @InjectModel(Favorite.name) private readonly FavoriteModel: Model<Favorite>,
  ) {}
  async udpate(
    id: string,
    createFavoriteDto: CreateFavoriteDto,
  ): Promise<Favorite> {
    try {
      return await this.FavoriteModel.findByIdAndUpdate(id, createFavoriteDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    try {
      const createdFavorite = new this.FavoriteModel(createFavoriteDto);
      return await createdFavorite.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
