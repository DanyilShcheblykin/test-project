import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './payload';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    private readonly studentService: StudentService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mamam342342rm3knfj3rj34',
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    if (payload.role === 'student') {
      const student = await this.studentService.findOneById(payload.sub);
      if (!student) {
        throw new UnauthorizedException();
      }
      return student;
    }
  }
}
