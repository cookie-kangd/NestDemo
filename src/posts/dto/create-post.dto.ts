import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty({ message: '缺少作者信息' })
  readonly author: string;

  @ApiPropertyOptional({ description: '内容' })
  @IsString()
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  @IsString()
  readonly thumb_url: string;

  @ApiProperty({ description: '文章类型' })
  readonly type: number;

  @ApiProperty({ description: '文章ID' })
  readonly id: number;
}

export class IdReq {
  @ApiProperty({ description: '文章ID' })
  @IsNotEmpty({ message: '缺少文章ID' })
  readonly id: number;
}
