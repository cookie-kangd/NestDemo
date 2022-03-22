import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  title: string;

  @Column({ length: 18 })
  author: string;

  @Column({ type: 'text', default: null })
  content: string;

  @Column({ default: null })
  cover_url: string;

  @Column({ type: 'tinyint', default: 0 })
  type: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
