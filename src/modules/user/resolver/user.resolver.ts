import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User, UserList } from 'src/model/user/user.model';
import { UserService } from '../service/user.service';
import { Post } from 'src/model/post/post.model';
import { PostLoader } from 'src/loader/post/post.loader';
import { UserListArgs } from 'src/common/request/user/get-userList.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postLoader: PostLoader,
  ) {}

  @Query((returns) => [User])
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Query((returns) => UserList)
  async getAllWithPagination(@Args() args: UserListArgs) {
    return this.userService.getAllWithPagination(args);
  }

  @ResolveField((returns) => [Post])
  async posts(@Parent() user: User): Promise<Post[]> {
    return this.postLoader.findAllByUserId.load(user.id);
  }
}
