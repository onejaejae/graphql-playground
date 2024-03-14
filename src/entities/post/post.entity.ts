import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from 'src/core/database/typeorm/base.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column('varchar', { length: 40 })
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  content: string;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @ManyToOne(() => User, (user) => user.Posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  Author: User;

  static of(title: string, content: string, userId: number) {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.userId = userId;

    return post;
  }
}
