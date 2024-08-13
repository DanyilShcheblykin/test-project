import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityBase } from 'src/utils/entity-base';
import { Language } from 'src/language/entities/language.entity';
import { Level } from 'src/level/entities.ts/level.entity';
import { File } from 'src/file/entities/file.entity';

@Entity({ name: 'teachers' })
export class Teacher extends EntityBase {
  @Column({ nullable: false })
  typeOfTeacher: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  facebookId: string;

  @Column({ nullable: true, default: null })
  refreshTokenHash: string;

  @ManyToOne(() => Language, (teacherLanguage) => teacherLanguage.teachers)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @ManyToMany(() => Level, (teacherLevel) => teacherLevel.teachers)
  @JoinTable({
    name: 'teacher_level',
    joinColumns: [{ name: 'teacher_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'level_id', referencedColumnName: 'id' }],
  })
  level: Array<Level>;

  @OneToMany(() => File, (file) => file.teacher)
  files: Array<File>;
}
