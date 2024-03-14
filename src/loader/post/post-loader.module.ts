import { Module } from '@nestjs/common';
import { PostLoader } from './post.loader';
import { PostRepositoryModule } from 'src/entities/post/post-repository.module';

@Module({
  imports: [PostRepositoryModule],
  providers: [PostLoader],
  exports: [PostLoader],
})
export class PostLoaderModule {}
