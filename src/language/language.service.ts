import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
  ) {}

  public async getLanguageById(languageId: string) {
    return await this.languageRepo.findOne({ where: { id: languageId } });
  }

  public async getLanguages(){
    return await this.languageRepo.find()
  }

}
