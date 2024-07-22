import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/entities/student.entity';
import { VerificationCode } from './auth/entities/verification-code.entity';
import { TemporaryJwtStrategy } from './auth/strategy/temporary.jwt';
import { AuthJwtStrategy } from './auth/strategy/access.jwt';
import authConfig from './config/auth.config';
import emailConfig from './config/email.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      load: [authConfig, emailConfig, databaseConfig , appConfig], // this is for having asses to config data
    }),
    TypeOrmModule.forRootAsync({
      //configuration for TypeORM
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
      serveRoot: '/storage',
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    StudentModule,
  ],
})
export class AppModule {}
