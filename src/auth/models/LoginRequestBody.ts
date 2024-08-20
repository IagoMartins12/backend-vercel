import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @IsString()
  password: string;
}
