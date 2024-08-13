import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherRequestDto } from './dto/create-teacher.dto';
import * as bcrypt from 'bcryptjs';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    private readonly fileService: FileService,
  ) {}

  public async findOneById(id: string) {
    const teacher = await this.teacherRepo.findOne({ where: { id } });
    if (!teacher) {
      throw new BadRequestException('User not found');
    }
    return teacher;
  }
  public async findOneByEmail(email: string) {
    const teacher = await this.teacherRepo.findOne({ where: { email } });
    if (teacher) {
      throw new BadRequestException('Teacher already exists');
    }
    return teacher;
  }

  public async createTeacher(
    createTeacherDto: CreateTeacherRequestDto,
    files: Array<Express.Multer.File>,
  ) {
    const { typeOfTeacher, firstName, lastName, email, password, timezone } =
      createTeacherDto;
console.log("-----")
    await this.findOneByEmail(email);

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const savedTeacher = await this.teacherRepo.save({
      typeOfTeacher,
      firstName,
      lastName,
      email,
      password: hashPassword,
      timezone,
    });
    await this.fileService.saveFiles(files, savedTeacher);
    return savedTeacher;
  }
}
