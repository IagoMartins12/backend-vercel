import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypePagamentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type_pagament_name: string;
}
