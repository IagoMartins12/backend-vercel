import { ApiProperty } from '@nestjs/swagger';
import { UserAddress } from '../entities/user_address.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserAddressDto extends UserAddress {
  @ApiProperty({
    description: 'Endereço do usuario',
    example: 'Estrada de ligação',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Cep',
    example: '05280-000',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'Numero do endereço',
    example: 40,
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'Cidade do usuario',
    example: 'São paulo',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Bairro do usuario',
    example: 'Sol nascente',
  })
  @IsString()
  district: string;

  @ApiProperty({
    description: 'UF',
    example: 'SP',
  })
  @IsString()
  uf: string;

  @ApiProperty({
    description: 'Referencia',
    example: 'Abaixo da farmacia',
  })
  @IsString()
  reference: string;

  @ApiProperty({
    description: 'Tipo de endereço, 0 = Casa e 1 = Trabalho',
    example: 0,
  })
  @IsNumber()
  type_adress: number;
}
