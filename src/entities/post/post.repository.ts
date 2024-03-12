import { EntityTarget } from 'typeorm';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { Injectable } from '@nestjs/common';
import { TransactionManager } from 'src/core/database/typeorm/transaction.manager';
import { Post } from './post.entity';

@Injectable()
export class PostRepository extends GenericTypeOrmRepository<Post> {
  constructor(protected readonly txManager: TransactionManager) {
    super(Post);
  }

  getName(): EntityTarget<Post> {
    return Post.name;
  }
}
