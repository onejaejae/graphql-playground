import { Injectable } from '@nestjs/common';
import { UserListArgs } from 'src/common/request/user/get-userList.dto';
import { UserRepository } from 'src/entities/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    return this.userRepository.find({});
  }

  async getAllWithPagination(args: UserListArgs) {
    return this.userRepository.paginate(args, { where: {} });
  }
}
