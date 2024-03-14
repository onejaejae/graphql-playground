import { Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/common/request/post/create-post.dto';
import { PostListArgs } from 'src/common/request/post/get-postList.dto';
import { UpdatePostDto } from 'src/common/request/post/update-post.dto';
import { PostRepository } from 'src/entities/post/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPosts(postListArgs: PostListArgs) {
    return this.postRepository.paginate(postListArgs, { where: {} });
  }

  async getPostWithAuthor(postId: number) {
    await this.postRepository.findByIdOrThrow(postId);
    return this.postRepository.getPostWithAuthor(postId);
  }

  async createPost(createPostDto: CreatePostDto) {
    const postEntity = createPostDto.toEntity();
    return this.postRepository.createEntity(postEntity);
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findByIdOrThrow(postId);
    return this.postRepository.updateOneByMerge(post, updatePostDto);
  }
}
