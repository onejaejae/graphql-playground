import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from './create-post.dto';

@InputType({ description: '게시글 수정 데이터' })
export class UpdatePostDto extends PartialType(CreatePostDto) {}
