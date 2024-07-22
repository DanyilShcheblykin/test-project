import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/language/entities/language.entity';
import { LanguageSeedService } from './language-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageSeedService],
  exports: [LanguageSeedService],
})
export class LanguageSeedModule {}
