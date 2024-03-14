import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

export enum PaginationDefault {
  PAGE_DEFAULT = 1,
  TAKE_DEFAULT = 10,
}

@ArgsType()
export class PaginationRequest {
  @IsOptional()
  @Field((type) => Int, { description: 'page' })
  page = PaginationDefault.PAGE_DEFAULT;

  @IsOptional()
  @Field((type) => Int, { description: 'take' })
  take = PaginationDefault.TAKE_DEFAULT;

  getSkip() {
    return (this.page - 1) * this.take;
  }

  getTake() {
    return this.take;
  }
}
