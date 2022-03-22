import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostsService, PostsRo } from './posts.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto, IdReq } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post
   */
  @ApiOperation({ summary: '创建文章' })
  @Post('addPost')
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  /**
   * 获取所有文章
   */
  @ApiOperation({ summary: '获取文章列表' })
  @Get('getAll')
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  /**
   * 获取指定文章
   * @param id
   */
  @ApiOperation({ summary: '获取指定文章' })
  @Post('getPost')
  async findById(@Body() post: IdReq) {
    return await this.postsService.findById(post.id);
  }

  /**
   * 更新文章
   * @param post
   */
  @ApiOperation({ summary: '更新指定文章' })
  @Post('updatePost')
  async update(@Body() post: CreatePostDto) {
    return await this.postsService.updateById(post);
  }

  /**
   * 删除
   * @param id
   */
  @ApiOperation({ summary: '删除文章' })
  @Post('deletePost')
  async remove(@Body() post: IdReq) {
    return await this.postsService.remove(post.id);
  }
}
