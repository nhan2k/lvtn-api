import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

export interface IPostRepository {
  findAll(): Promise<Post[]>;
  findOne(id: string): Promise<Post>;
  create(
    createPostDto: CreatePostDto,
    imgPaths: string[],
    userId: string,
  ): Promise<Post>;
  update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
  delete(id: string): Promise<Post>;
  count(): Promise<number>;
  userFindAll(user: any): Promise<Post[]>;
}
