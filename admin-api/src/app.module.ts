import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserGateway } from './user/user.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { UserRepository } from './user/user.repository';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1, //prod env파일을 10번 찾고 없으면 
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [
          path.join(__dirname, 'src/entities/**/*.entity.{js, ts}'),
        ],
        synchronize: false,
        logging: true,
        timezone: 'local',
      }),
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserGateway, UserRepository],
})
export class AppModule {}
