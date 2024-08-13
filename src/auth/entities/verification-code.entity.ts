import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'verification-code' })
export class VerificationCode extends EntityBase {
  @Column({ nullable: false })
  verificationCode: string;

  @Column({ nullable: false })
  experationTime: string;

  @ManyToOne(() => Student, { nullable: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Teacher, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
