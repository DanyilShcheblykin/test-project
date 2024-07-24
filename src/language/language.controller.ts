import { Controller, Get, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from 'src/auth/guards/access-jwt-auth';

@ApiTags('langauges')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Get()
  async getLanguages() {
    return await this.languageService.getLanguages();
  }
}
