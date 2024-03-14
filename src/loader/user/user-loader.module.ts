import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/entities/user/user-repository.module';
import { UserLoader } from './user.loader';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserLoader],
  exports: [UserLoader],
})
export class UserLoaderModule {}
