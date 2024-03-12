import { BaseEntity } from 'src/core/database/typeorm/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  email: string;

  @OneToMany(() => Post, (post) => post.Author)
  Posts: Post[];
}
