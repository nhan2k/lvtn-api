export class CreateRatingDto {
  userId: string;
  userTargetId: string;
  postId: string;
  rate: number;
  comment: string;
}
