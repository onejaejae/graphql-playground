import { Module } from '@nestjs/common';
import { PostRepositoryModule } from 'src/entities/post/post-repository.module';
import { PostResolver } from './resolver/post.resolver';
import { PostService } from './service/post.service';
import { UserLoaderModule } from 'src/loader/user/user-loader.module';

@Module({
  imports: [PostRepositoryModule, UserLoaderModule],
  controllers: [],
  providers: [PostResolver, PostService],
})
export class PostModule {}
