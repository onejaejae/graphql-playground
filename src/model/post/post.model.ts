import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/pagination/pagination.response';

@ObjectType({ description: '게시글' })
export class Post {
  @Field((type) => Int, { description: 'id' })
  id: number;

  @Field((type) => String, { description: '제목' })
  title: string;

  @Field((type) => String, { description: '내용' })
  content: string;
}

@ObjectType({ description: '게시글 리스트' })
export class PostList extends Paginated(Post) {}
