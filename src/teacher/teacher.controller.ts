import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from 'src/auth/guards/access-jwt-auth';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Get('me')
  async getUserInfo(@Req() user) {
    const { id } = user.user;
    return this.teacherService.getUserInfo(id);
  }
}
