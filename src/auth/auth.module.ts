import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode, Student]),
    JwtModule.register({}),
    StudentModule,
    EmailModule,
  ],
  providers: [AuthService, AccessJwtStrategy, TemporaryJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
