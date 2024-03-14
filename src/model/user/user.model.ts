import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/pagination/pagination.response';

@ObjectType({ description: '유저' })
export class User {
  @Field((type) => Int, { description: 'id' })
  id: number;

  @Field((type) => String, { description: '이메일' })
  email: string;
}

@ObjectType({ description: '유저 목록' })
export class UserList extends Paginated(User) {}
