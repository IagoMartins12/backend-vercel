import { Controller, Get, Post, Body, Param, Req, Put } from '@nestjs/common';
import { UserAddressService } from './user_address.service';
import { CreateUserAddressDto } from './dto/create-user_address.dto';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUserAddressDto } from './dto/get-user_address.dto';

@ApiBearerAuth()
@ApiTags('address')
@Controller('address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @ApiOperation({
    summary: 'Get user address',
  })
  @ApiOkResponse({
    type: GetUserAddressDto,
    isArray: true,
  })
  @Get('/me')
  findAllUser(@Req() req: AuthRequest) {
    return this.userAddressService.findAllUser(req.user);
  }

  @ApiOperation({
    summary: 'Create a user address',
  })
  @Post('create')
  create(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @Req() req: AuthRequest,
  ) {
    return this.userAddressService.create(createUserAddressDto, req.user);
  }

  @ApiOperation({
    summary: 'Delete a user address (insert the isActive flag)',
  })
  @Put(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.remove(id);
  }

  @ApiOperation({
    summary: 'Administrative route to get all address in system',
  })
  @ApiOkResponse({
    type: GetUserAddressDto,
    isArray: true,
  })
  @Get('admin')
  getAll() {
    return this.userAddressService.findAll();
  }
}
