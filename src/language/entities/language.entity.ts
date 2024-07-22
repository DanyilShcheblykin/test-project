import { Student } from 'src/student/entities/student.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'language' })
export class Language extends EntityBase {
  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => Student, (student) => student.language)
  students: Array<Student>;
}
