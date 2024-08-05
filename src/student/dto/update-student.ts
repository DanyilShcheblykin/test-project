import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  timezone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  language_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  level_id: string;
}
