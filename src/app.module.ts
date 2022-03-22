import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env';
import { PostsEntity } from './posts/entities/posts.entity';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validate.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [PostsEntity],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', '12345'),
        database: configService.get('DB_DATABASE', 'blog'),
        // charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: true,
      }),
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
