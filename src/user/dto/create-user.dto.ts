import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

//Regras de criação de usuario
export class CreateUserDto extends User {
  @ApiProperty({
    description: 'Email do usuario',
    example: 'exemplo@exemplo.com',
  })
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'O campo de email não pode estar vazio' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4, {
    message: 'Senha abaixo dos caracteres permitidos',
  })
  @MaxLength(20, {
    message: 'Senha acima do caracter permitido',
  })
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
}
