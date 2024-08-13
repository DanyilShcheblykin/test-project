import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EntityBase } from 'src/utils/entity-base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'file' })
export class File extends EntityBase {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  path: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.files, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
