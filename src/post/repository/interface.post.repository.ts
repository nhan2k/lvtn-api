import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

export interface IPostRepository {
  customerFindAll(category?: string): Promise<Post[]>;
  findOne(id: string): Promise<Post>;
  create(
    createPostDto: CreatePostDto,
    imgPaths: string[],
    userId: string,
  ): Promise<Post>;
  update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
  delete(id: string): Promise<Post>;
  count(): Promise<number>;
  userFindAll(userId: string, status: string): Promise<Post[]>;
  adminFindAll(userId: string): Promise<Post[]>;
  search(keyword: string): Promise<Post[]>;
}
