import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreatePostDto } from 'src/common/request/post/create-post.dto';
import { PostList, Post as postModel } from 'src/model/post/post.model';
import { PostService } from '../service/post.service';
import { User } from 'src/model/user/user.model';
import { Post } from 'src/entities/post/post.entity';
import { UserLoader } from 'src/loader/user/user.loader';
import { PostListArgs } from 'src/common/request/post/get-postList.dto';
import { UpdatePostDto } from 'src/common/request/post/update-post.dto';

@Resolver((of) => postModel)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userLoader: UserLoader,
  ) {}

  @Query((returns) => PostList)
  async getPosts(@Args() postListArgs: PostListArgs) {
    return this.postService.getPosts(postListArgs);
  }

  @Query((returns) => postModel)
  async getPostById(
    @Args('postId', { description: '게시글 id', type: () => Int })
    postId: number,
  ): Promise<Post> {
    return this.postService.getPostWithAuthor(postId);
  }

  @ResolveField((returns) => User)
  async author(@Parent() post: Post): Promise<User> {
    return this.userLoader.findByUserId.load(post.userId);
  }

  @Mutation(() => postModel)
  async createPost(@Args('data') createPostDto: CreatePostDto): Promise<Post> {
    return this.postService.createPost(createPostDto);
  }

  @Mutation(() => postModel)
  async updatePost(
    @Args('postId', { description: '게시글 id', type: () => Int })
    postId: number,
    @Args('data')
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.updatePost(postId, updatePostDto);
  }
}
