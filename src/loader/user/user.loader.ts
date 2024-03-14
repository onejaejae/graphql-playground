import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(private readonly userRepository: UserRepository) {}

  findByUserId = new DataLoader<number, User>(async (userIds: number[]) => {
    const users: User[] = await this.userRepository.findByIds('id', userIds);

    return userIds.map((userId: number) =>
      users.find((user) => user.id === userId),
    );
  });
}
