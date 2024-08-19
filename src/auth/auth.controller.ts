import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentRequestDto } from 'src/student/dto/create-student';
import { VerifiLinkDto } from './dto/verifi-link';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginStudentDto } from 'src/student/dto/log-in';
import { CreateTeacherRequestDto } from 'src/teacher/dto/create-teacher.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadOptionsWithoutJWT } from 'src/utils/file-helper';
import { LogInTeacherRequestDto } from 'src/teacher/dto/login-teacher.dto';

@ApiTags('auth') // for swager (title of all this controller)
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name, {
    timestamp: true,
  });
  constructor(private authService: AuthService) {}

  @Post('sign-up/student')
  @ApiBody({
    type: CreateStudentRequestDto,
  })
  async createStudent(@Body() createStudentDto: CreateStudentRequestDto) {
    console.log('sign up Student');
    return this.authService.signUpStudent(createStudentDto);
  }

  @Post('log-in/student')
  @ApiBody({
    type: LoginStudentDto,
  })
  async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return this.authService.loginStudent(loginStudentDto);
  }

  @Post('verify-link/student')
  @ApiBody({
    type: VerifiLinkDto,
  })
  async verifiLinkStudent(@Body() verifiLinkDto: VerifiLinkDto) {
    return this.authService.studentVerifiLink(verifiLinkDto);
  }

  @UseInterceptors(FilesInterceptor('files', 10, fileUploadOptionsWithoutJWT))
  @ApiOperation({
    summary: 'Sign up for teacher',
  })
  @ApiBody({
    type: CreateTeacherRequestDto,
  })
  @Post('sign-up/teacher')
  async createTeacher(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createTeacherDto: CreateTeacherRequestDto,
  ) {
    return this.authService.signupTeacher(createTeacherDto, files);
  }

  @Post('verify-link/teacher')
  @ApiBody({
    type: VerifiLinkDto,
  })
  async verifiLinkTeacher(@Body() verifiLinkDto: VerifiLinkDto) {
    return this.authService.teahcerVerifiLink(verifiLinkDto);
  }

  @Post('log-in/teacher')
  @ApiBody({
    type: LogInTeacherRequestDto,
  })
  async loginTeacher(@Body() LogInTeacherDto: LogInTeacherRequestDto) {
    return this.authService.loginTeacher(LogInTeacherDto);
  }
}
