import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/language/entities/language.entity';
import { LanguageSeedService } from './language-seed.service';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([Language]) , LanguageModule],
  providers: [LanguageSeedService],
  exports: [LanguageSeedService],
})
export class LanguageSeedModule {}
