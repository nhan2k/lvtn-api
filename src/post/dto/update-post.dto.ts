import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

type TPromotedEndDate = 1 | 3 | 7;
export class UpdatePostDto extends PartialType(CreatePostDto) {
  coin?: number;
  promotedEndDate?: TPromotedEndDate;
}
