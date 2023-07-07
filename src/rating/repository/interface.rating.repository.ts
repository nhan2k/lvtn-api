import { CreateRatingDto } from '../dto/create-rating.dto';
import { Rating } from '../schema/rating.schema';

export interface IRatingRepository {
  create(createRatingDto: CreateRatingDto): Promise<Rating>;
}
