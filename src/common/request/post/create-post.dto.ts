import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Post } from 'src/entities/post/post.entity';

@InputType({ description: '게시글 생성 데이터' })
export class CreatePostDto {
  @IsString()
  @Field((type) => String, { description: '제목' })
  title: string;

  @IsString()
  @Field((type) => String, { description: '내용' })
  content: string;

  @IsNumber()
  @Field((type) => Int, { description: '게시글 생성 유저 id' })
  userId: number;

  toEntity() {
    return Post.of(this.title, this.content, this.userId);
  }
}
