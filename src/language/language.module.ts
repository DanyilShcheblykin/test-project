import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';

@Module({
  controllers: [LanguageController],
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
