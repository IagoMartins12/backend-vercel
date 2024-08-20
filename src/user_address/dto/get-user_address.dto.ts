import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUserAddressDto } from './create-user_address.dto';

export class GetUserAddressDto extends CreateUserAddressDto {
  @ApiProperty({
    description: 'Se tá ativo, 0 = Ativo e 1 = Inativo',
    example: 0,
  })
  @IsNumber()
  isActive: number;
}
