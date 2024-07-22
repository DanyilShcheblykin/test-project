import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from 'src/language/entities/language.entity';

@Injectable()
export class LanguageSeedService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async run() {
    const languages = [{ title: 'Spanish' }, { title: 'English' }];

    for (const languageInfo of languages) {
      const existingLanguage = await this.languageRepository.findOne({
        where: { title: languageInfo.title },
      });

      if (!existingLanguage) {
        const language = new Language();
        language.title = languageInfo.title;
        await this.languageRepository.save(language);
      }
    }
  }
}
