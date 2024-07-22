import { Student } from 'src/student/entities/student.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'verification-code' })
export class VerificationCode extends EntityBase {
  @Column({ nullable: false })
  verificationCode: string;

  @Column({ nullable: false })
  experationTime: string;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
