import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsDate()
  dataNascimento: Date;

  @IsNumber()
  idade: number;
}
