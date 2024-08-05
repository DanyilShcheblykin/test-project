import { Controller, Get, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { AccessJwtAuthGuard } from 'src/auth/guards/access-jwt-auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @UseGuards(AccessJwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  async getLevel() {
    return this.levelService.getLevels();
  }
}
