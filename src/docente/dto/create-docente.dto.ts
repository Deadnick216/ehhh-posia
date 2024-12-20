import { IsString, IsEmail } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsString()
  rut: string;
}