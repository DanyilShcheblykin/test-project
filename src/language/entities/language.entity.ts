import { Student } from 'src/student/entities/student.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'language' })
export class Language extends EntityBase {
  @Column({ nullable: false })
  title: string;

  @OneToMany(() => Student, (student) => student.language)
  students: Array<Student>;
}
