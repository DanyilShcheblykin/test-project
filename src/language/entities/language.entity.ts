import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'language' })
export class Language extends EntityBase {
  @Column({ nullable: false })
  title: string;

  @OneToMany(() => Student, (student) => student.language)
  students: Array<Student>;

  @OneToMany(() => Teacher, (teacher) => teacher.language)
  teachers: Array<Teacher>;
}
