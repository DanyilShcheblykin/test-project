import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from 'src/level/entities.ts/level.entity';

const levels = [
  { title: 'A1', sub_title: 'Beginner', description: 'Some text' },
  { title: 'A2', sub_title: 'Pre-Intermediate', description: 'Some text' },
  { title: 'B1', sub_title: 'Intermediate', description: 'Some text' },
  { title: 'B2', sub_title: 'Upper-Intermediate', description: 'Some text' },
  { title: 'C1', sub_title: 'Advanced', description: 'Some text' },
  { title: 'C2', sub_title: 'Proficient', description: 'Some text' },
  { title: 'Specific', sub_title: 'Specific', description: 'Some text' },
];

@Injectable()
export class LevelSeedService {
  constructor(
    @InjectRepository(Level) private readonly levelRepo: Repository<Level>,
  ) {}

  public async run() {
    for (const levelData of levels) {
      const level = await this.levelRepo.findOne({
        where: { title: levelData.title },
      });
      if (!level) {
        const level = new Level();
        level.title = levelData.title;
        level.sub_title = levelData.sub_title;
        level.description = levelData.description;
        console.log('level');
        console.log(level);
        this.levelRepo.save(level);
      }
    }
  }
}
