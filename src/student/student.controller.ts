import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentRequestDto } from './dto/update-student';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from 'src/auth/guards/access-jwt-auth';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Patch()
  async updateStudentInfo(
    @Req() user,
    @Body() updateStudentDto: UpdateStudentRequestDto,
  ) {
    const { id } = user.user;
    return this.studentService.updateStudentInfo(updateStudentDto, id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Get('me')
  async getUserInfo(@Req() user) {
    const { id } = user.user;
    return this.studentService.getUserInfo(id);
  }
}
