import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccessJwtStrategy } from './strategy/access.jwt';
import { TemporaryJwtStrategy } from './strategy/temporary.jwt';
import { AuthController } from './auth.controller';
import { StudentModule } from 'src/student/student.module';
import { Student } from 'src/student/entities/student.entity';
import { EmailModule } from 'src/email/email.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { LoggerMiddleware } from 'src/middlewares/loger.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode, Student]),
    JwtModule.register({}),
    StudentModule,
    EmailModule,
    TeacherModule,
  ],
  providers: [AuthService, AccessJwtStrategy, TemporaryJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
