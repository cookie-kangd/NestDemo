import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './entities/posts.entity';

export interface PostsRo {
  list: PostsEntity[];
  count: number;
}
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', HttpStatus.BAD_REQUEST);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', HttpStatus.BAD_REQUEST);
    }
    return await this.postsRepository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const qb = await getRepository(PostsEntity).createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    if (!id) {
      throw new HttpException(`缺少文章ID参数`, HttpStatus.BAD_REQUEST);
    }
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.postsRepository.findOne(id);
  }

  // 更新文章
  async updateById(post): Promise<PostsEntity> {
    if (!post.id) {
      throw new HttpException(`缺少文章ID参数`, HttpStatus.BAD_REQUEST);
    }
    const existPost = await this.postsRepository.findOne(post?.id);
    if (!existPost) {
      throw new HttpException(
        `id为${post?.id}的文章不存在`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 删除文章
  async remove(id) {
    if (!id) {
      throw new HttpException(`缺少文章ID参数`, HttpStatus.BAD_REQUEST);
    }
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.postsRepository.remove(existPost);
  }
}
