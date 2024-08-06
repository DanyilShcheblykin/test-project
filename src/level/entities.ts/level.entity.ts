import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

@Entity({ name: 'level' })
export class Level extends EntityBase {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  sub_title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => Student, (student) => student.level)
  students: Array<Student>;

  @ManyToMany(() => Teacher, (teacher) => teacher.level)
  teachers: Array<Teacher>;
}
