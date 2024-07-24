import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './payload';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    private readonly studentService: StudentService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecret'),
    });
    console.log('===================');
  }

  async validate(payload: JwtPayload): Promise<any> {
    console.log('validate');
    console.log(payload);
    console.log('===================');

    if (payload.role === 'student') {
      const student = await this.studentService.findOneById(payload.sub);
      console.log('------------');
      console.log(student);
      if (!student) {
        throw new UnauthorizedException();
      }
      return student;
    }
  }
}
