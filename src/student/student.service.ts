import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentRequestDto } from './dto/create-student';
import * as bcrypt from 'bcryptjs';
import { UpdateStudentRequestDto } from './dto/update-student';
import { LanguageService } from 'src/language/language.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRep: Repository<Student>,
    private readonly languageService: LanguageService,
  ) {}

  async createStudent(
    createStudentRequestDto: CreateStudentRequestDto,
  ): Promise<Student> {
    const { firstName, lastName, email, password, timezone } =
      createStudentRequestDto;
    const student = await this.studentRep.findOne({
      where: { email },
    });
    if (student) {
      throw new BadRequestException('Student already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return this.studentRep.save({
      firstName,
      lastName,
      email,
      timezone,
      password: hashPassword,
    });
  }

  public async findOneById(id: string) {
    const student = this.studentRep.findOne({ where: { id: id } });
    if (!student) {
      throw new BadRequestException('User not found');
    }
    return student;
  }

  public async getUserInfo(studentId: string) {
    const student = await this.studentRep.findOne({
      where: { id: studentId },
      relations: ['language'],
    });
    return student;
  }

  public async updateStudentInfo(
    updateStudentDto: UpdateStudentRequestDto,
    studentId: string,
  ) {
    const student = await this.findOneById(studentId);
    const { languageId, ...restData } = updateStudentDto;
    if (languageId) {
      const language = await this.languageService.getLanguageById(languageId);
      student.language = language;
    }

    Object.assign(student, restData);
    return await this.studentRep.save(student);
  }
}
