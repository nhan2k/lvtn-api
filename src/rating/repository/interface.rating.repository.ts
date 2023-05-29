import { CreateRatingDto } from '../dto/create-rating.dto';
import { Rating } from '../entities/rating.entity';

export interface IRatingRepository {
  create(createRatingDto: CreateRatingDto): Promise<Rating>;
}
