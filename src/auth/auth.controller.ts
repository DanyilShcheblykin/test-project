import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentRequestDto } from 'src/student/dto/create-student';
import { VerifiLinkDto } from './dto/verifi-link';
import { ApiTags } from '@nestjs/swagger';
import { LoginStudentDto } from 'src/student/dto/log-in';

@ApiTags('auth') // for swager (title of all this controller)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name, {
    timestamp: true,
  });
  constructor(private authService: AuthService) {}

  @Post('student/sign-up')
  async createStudent(@Body() createStudentDto: CreateStudentRequestDto) {
    console.log('sign up Student');
    return this.authService.signUpStudent(createStudentDto);
  }

  @Post('student/log-in')
  async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return this.authService.loginStudent(loginStudentDto);
  }

  @Post('verify-link')
  async verifiLink(@Body() verifiLinkDto: VerifiLinkDto) {
    return this.authService.studentVerifiLink(verifiLinkDto);
  }
}
