import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsDateString()
  dataNascimento: Date;

  @IsNumber()
  idade: number;
}
