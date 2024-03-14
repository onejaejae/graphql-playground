import { ArgsType } from '@nestjs/graphql';
import { PaginationRequest } from 'src/common/pagination/pagination.request';

@ArgsType()
export class PostListArgs extends PaginationRequest {}
