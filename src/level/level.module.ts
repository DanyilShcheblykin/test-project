import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities.ts/level.entity';

@Module({
  controllers: [LevelController],
  imports: [TypeOrmModule.forFeature([Level])],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
