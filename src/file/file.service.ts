import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private filesRepo: Repository<File>) {}

  async saveFiles(files: Array<Express.Multer.File>, teacher: Teacher) {
    const arrayOfFiles = files.map((fileInfo) => {
      return {
        name: fileInfo.filename,
        path: fileInfo.path,
        teacher: teacher,
      };
    });
    await this.filesRepo.save(arrayOfFiles);
  }
}
