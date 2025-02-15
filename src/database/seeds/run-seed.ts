import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { LanguageSeedService } from './language/language-seed.service';
import { LevelSeedService } from './level/level-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(LanguageSeedService).run();
  await app.get(LevelSeedService).run();

  await app.close();
};

runSeed();
