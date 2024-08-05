import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityBase } from 'src/utils/entity-base';
import { Language } from 'src/language/entities/language.entity';
import { Level } from 'src/level/entities.ts/level.entity';

@Entity({ name: 'students' })
export class Student extends EntityBase {
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

  @ManyToOne(() => Language, (studentLanguage) => studentLanguage.students)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @ManyToOne(() => Level, (studentLevel) => studentLevel.students)
  @JoinColumn({ name: 'level_id' })
  level: Level;
}
