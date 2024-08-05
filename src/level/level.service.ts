import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Level } from './entities.ts/level.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepo: Repository<Level>,
  ) {}

  async getLevels() {
    return await this.levelRepo.find();
  }
  async getLevelById(levelId: string) {
    return await this.levelRepo.findOne({ where: { id: levelId } });
  }
}
