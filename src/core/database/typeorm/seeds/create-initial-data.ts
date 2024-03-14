import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/entities/user/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    await userRepository.insert([
      {
        email: 'test@naver.com',
      },
      {
        email: 'test2@naver.com',
      },
      {
        email: 'test3@naver.com',
      },
      {
        email: 'test4@naver.com',
      },
      {
        email: 'test5@naver.com',
      },
    ]);
  }
}
