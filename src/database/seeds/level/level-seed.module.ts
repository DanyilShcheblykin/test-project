import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from 'src/level/level.module';
import { LevelSeedService } from './level-seed.service';
import { Level } from 'src/level/entities.ts/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), LevelModule],
  providers: [LevelSeedService],
  exports: [LevelSeedService],
})
export class LevelSeedModule {}
