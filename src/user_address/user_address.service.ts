import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user_address.dto';
import { UpdateUserAddressDto } from './dto/update-user_address.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserAddressDto: CreateUserAddressDto, user: User) {
    console.log('create user address', createUserAddressDto);
    const userAddress = await this.prisma.user_Adress.create({
      data: {
        address: createUserAddressDto.address,
        number: createUserAddressDto.number,
        type_adress: createUserAddressDto.type_adress,
        reference: createUserAddressDto.reference,
        city: createUserAddressDto.city,
        district: createUserAddressDto.district,
        uf: createUserAddressDto.uf,
        cep: createUserAddressDto.cep,
        user_id: user.id,
      },
    });

    console.log('user address', userAddress);
    return userAddress;
  }

  async findAllUser(user: User) {
    const userAddress = await this.prisma.user_Adress.findMany({
      where: {
        user_id: user.id,
      },
    });
    return userAddress;
  }

  async findAll() {
    const userAddress = await this.prisma.user_Adress.findMany();
    return userAddress;
  }

  async remove(id: string) {
    const userAddress = await this.prisma.user_Adress.update({
      where: {
        id: id,
      },
      data: {
        isActive: 1,
      },
    });

    return userAddress;
  }
}
