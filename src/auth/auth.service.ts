import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentRequestDto } from 'src/student/dto/create-student'; // Adjust path as necessary
import { Repository } from 'typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { StudentService } from 'src/student/student.service'; // Adjust path as necessary
import { createCipheriv } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { getVerificationEmail } from 'src/email/templates'; // Adjust path as necessary
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service'; // Adjust path as necessary
import { VerifiLinkDto } from './dto/verifi-link';
import { LoginStudentDto } from 'src/student/dto/log-in';
import { CreateTeacherRequestDto } from 'src/teacher/dto/create-teacher.dto';
import { TeacherService } from 'src/teacher/teacher.service';
import { LogInTeacherRequestDto } from 'src/teacher/dto/login-teacher.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepo: Repository<VerificationCode>,
    private readonly studentService: StudentService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly teacherService: TeacherService,
  ) {}

  // ===============student===============

  async signUpStudent(createStudentDto: CreateStudentRequestDto) {
    const student = await this.studentService.createStudent(createStudentDto);

    const verificationCodeResp = await this.createVerificationCode();
    const { verificationCode, experationTime } = verificationCodeResp;
    this.verificationCodeRepo.save<any>({
      verificationCode,
      experationTime,
      student: student,
    });

    const dataForEamilVerification = {
      baseUrl: this.configService.get('app.baseUrl'),
      firstName: createStudentDto.firstName,
    };

    const html = getVerificationEmail(
      dataForEamilVerification,
      'student',
      verificationCode,
    );
    this.emailService.sendMailSmtp(
      createStudentDto.email,
      'Student Email Verification Notification',
      null,
      html,
    );

    const payload = { sub: student.id, role: 'student' };
    const temporaryToken = await this.createTemporaryToken(payload);
    return { code: verificationCode, student, temporaryToken };
  }

  public async studentVerifiLink(verifiLinkDto: VerifiLinkDto) {
    const { verify_code } = verifiLinkDto;
    const verifyLinkData = await this.verificationCodeRepo.findOne({
      where: { verificationCode: verify_code },
      relations: ['student'],
    });
    if (!verifyLinkData) {
      throw new UnauthorizedException('Code is not valid');
    }
    const { student } = verifyLinkData;
    const expirationTime = new Date(verifyLinkData.experationTime).getTime();
    const currentTime = new Date().getTime();
    if (expirationTime < currentTime) {
      throw new UnauthorizedException('Code has expired');
    }

    const payload = { sub: student.id, role: 'student' };
    const accessToken = await this.createAccessToken(payload);
    const findedStudent = await this.studentService.findOneById(student.id);
    return { accessToken, studentId: findedStudent.id, student: findedStudent };
  }

  public async loginStudent(loginStudentDto: LoginStudentDto) {
    const student = await this.studentService.findOneByEmail(
      loginStudentDto.email,
    );
    if (!student) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: student.id, role: 'student' };
    const accessToken = await this.createAccessToken(payload);

    return { accessToken };
  }

  // =================teacher=====================

  public async signupTeacher(
    createTeacherDto: CreateTeacherRequestDto,
    files: Array<Express.Multer.File>,
  ) {
    const teacher = await this.teacherService.createTeacher(
      createTeacherDto,
      files,
    );
    const { verificationCode, experationTime } =
      await this.createVerificationCode();

    await this.verificationCodeRepo.save<any>({
      verificationCode,
      experationTime,
      teacher,
    });

    const dataForEamilVerification = {
      baseUrl: this.configService.get('app.baseUrl'),
      firstName: createTeacherDto.firstName,
    };

    const html = getVerificationEmail(
      dataForEamilVerification,
      'student',
      verificationCode,
    );
    this.emailService.sendMailSmtp(
      createTeacherDto.email,
      'Student Email Verification Notification',
      null,
      html,
    );

    const tempToken = await this.createTemporaryToken({
      role: 'teacher',
      sub: teacher.id,
    });

    return { teacher, verificationCode, tempToken };
  }

  public async teahcerVerifiLink(verifiLinkDto: VerifiLinkDto) {
    const { verify_code } = verifiLinkDto;
    const verifyLinkData = await this.verificationCodeRepo.findOne({
      where: { verificationCode: verify_code },
      relations: ['teacher'],
    });
    if (!verifyLinkData) {
      throw new UnauthorizedException('Code is not valid');
    }
    const { teacher } = verifyLinkData;
    const expirationTime = new Date(verifyLinkData.experationTime).getTime();
    const currentTime = new Date().getTime();
    if (expirationTime < currentTime) {
      throw new UnauthorizedException('Code has expired');
    }

    const payload = { sub: teacher.id, role: 'student' };
    const accessToken = await this.createAccessToken(payload);
    const findedTeacher = await this.teacherService.findOneById(teacher.id);

    return { accessToken, studentId: findedTeacher.id, student: findedTeacher };
  }

  public async loginTeacher(loginTeachertDto: LogInTeacherRequestDto) {
    const teacher = await this.teacherService.findOneByEmail(
      loginTeachertDto.email,
    );
    if (!teacher) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: teacher.id, role: 'teacher' };
    const accessToken = await this.createAccessToken(payload);

    return { accessToken };
  }

  // =================common=====================

  async createVerificationCode() {
    const verificationCode = this.generateCode();
    const encryptedVerificationCode = this.encryptCode(verificationCode);
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
    return {
      verificationCode: encryptedVerificationCode,
      experationTime: expirationTime,
    };
  }

  public generateCode(): string {
    const uuid = uuidv4();
    const code = uuid.replace(/-/g, '').substring(0, 10);
    return code;
  }

  public encryptCode(code: string): string {
    const algorithm = 'aes-256-ecb';

    const key = this.configService.get('auth.verifyCodeSecret');
    console.log(key);
    const cipher = createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(code, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  public async createTemporaryToken(payload: any): Promise<any> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.jwtTemporarySecret'),
      expiresIn: '5m',
    });
  }

  public async createAccessToken(payload: any): Promise<any> {
    console.log('payload');
    console.log(payload);
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.jwtSecret'),
      expiresIn: '7d',
    });
  }
}
