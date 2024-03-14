import { ClassConstructor } from 'class-transformer';
import { PaginationResponse } from './pagination.response';

export class PaginationBuilder<T> {
  _list: T[];
  _page: number;
  _take: number;
  _totalCount: number;
  _type: ClassConstructor<T>;

  setType(type: ClassConstructor<T>) {
    this._type = type;
    return this;
  }

  setData(data: T[]) {
    this._list = data;
    return this;
  }

  setPage(page: number) {
    this._page = page;
    return this;
  }

  setTake(take: number) {
    this._take = take;
    return this;
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
    return this;
  }

  build() {
    return new PaginationResponse(this);
  }
}
