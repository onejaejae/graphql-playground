import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { PostLoaderModule } from 'src/loader/post/post-loader.module';

@Module({
  imports: [UserRepositoryModule, PostLoaderModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
