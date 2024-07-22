import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifiLinkDto {
  @ApiProperty()
  @IsString()
  verify_code: string;
}
