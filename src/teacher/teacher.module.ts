import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { LanguageModule } from 'src/language/language.module';
import { LevelModule } from 'src/level/level.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    LanguageModule,
    LevelModule,
    FileModule,
  ],
  exports: [TeacherService],
})
export class TeacherModule {}
