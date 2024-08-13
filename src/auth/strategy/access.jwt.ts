import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './payload';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    if (payload.role === 'student') {
      const student = await this.studentService.findOneById(payload.sub);
      if (!student) {
        throw new UnauthorizedException();
      }
      return student;
    } else if (payload.role === 'teacher') {
      const teahcer = await this.teacherService.findOneById(payload.sub);
      if (!teahcer) {
        throw new UnauthorizedException();
      }
      return teahcer;
    } else {
      throw new UnauthorizedException();
    }
  }
}
