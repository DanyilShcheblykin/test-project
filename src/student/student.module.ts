import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
