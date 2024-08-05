import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'src/language/language.module';
import { LevelModule } from 'src/level/level.module';

@Module({
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student]) , LanguageModule , LevelModule],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
