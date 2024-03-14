import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Post } from 'src/entities/post/post.entity';
import { PostRepository } from 'src/entities/post/post.repository';

@Injectable({ scope: Scope.REQUEST })
export class PostLoader {
  constructor(private readonly postRepository: PostRepository) {}

  findAllByUserId = new DataLoader<number, Post[]>(
    async (userIds: number[]) => {
      const posts: Post[] = await this.postRepository.findByIds(
        'userId',
        userIds,
      );

      const postGroup: { [key: number]: Post[] } = {};
      posts.forEach((post: Post) => {
        if (!postGroup[post.userId]) {
          postGroup[post.userId] = [];
        }
        postGroup[post.userId].push(post);
      });

      return userIds.map((userId: number) => postGroup[userId] ?? []);
    },
  );
}
