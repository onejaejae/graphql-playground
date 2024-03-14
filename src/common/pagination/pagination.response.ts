import { PaginationBuilder } from './pagination.builder';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Expose } from 'class-transformer';

export interface IPaginatedType<T> {
  totalCount: number;
  list: T[];
  page: number;
  take: number;
  totalPages: number;
  hasNext: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType<T> implements IPaginatedType<T> {
    @Field((type) => Int, { description: '전체 데이터 개수' })
    totalCount: number;

    @Field((type) => [classRef], { description: '리스트' })
    list: Array<T>;

    @Field((type) => Int, { description: '페이지' })
    page: number;

    @Field((type) => Int, { description: '테이크' })
    take: number;

    @Field((type) => Int, { description: '전체 페이지' })
    totalPages: number;

    @Field((type) => Boolean, { description: 'next 유무' })
    hasNext: boolean;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}

export class PaginationResponse<T> {
  totalCount: number;
  list: Array<T>;
  page: number;
  take: number;

  constructor(private readonly paginationBuilder: PaginationBuilder<T>) {
    this.totalCount = paginationBuilder._totalCount;
    this.list = paginationBuilder._list;
    this.page = paginationBuilder._page;
    this.take = paginationBuilder._take;
  }

  @Expose()
  get totalPages(): number {
    return Math.ceil(this.totalCount / this.take);
  }

  @Expose()
  get hasNext(): boolean {
    return this.totalPages > this.page;
  }
}
