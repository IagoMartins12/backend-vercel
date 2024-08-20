import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './models/ForgetPassword';
import { ChangePasswordDto } from './models/ChangePassword';
import { GetUserDto } from './dto/get-user-dto';
import { GetUserFullDto } from './dto/get-user-full-dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get specific data',
  })
  @ApiOkResponse({
    type: GetUserDto,
  })
  @Get('me')
  getMe(@Req() req: AuthRequest) {
    return this.userService.findMe(req.user);
  }

  @ApiOperation({
    summary: 'Get user data complete (with all information on others table)',
  })
  @ApiOkResponse({
    type: GetUserFullDto,
  })
  @Get('me/info')
  getMeInfos(@Req() req: AuthRequest) {
    return this.userService.getData(req.user);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @Patch('me/update')
  update(@Req() req: AuthRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Change user password',
  })
  @Patch('changePassword')
  changePassword(
    @Req() req: AuthRequest,
    @Body() resetPassword: ResetPasswordDto,
  ) {
    return this.userService.changePassword(req.user, resetPassword);
  }

  @ApiOperation({
    summary: 'Reset user password',
  })
  @Patch('resetPassword')
  @IsPublic()
  resetPassword(@Body() resetPassword: ChangePasswordDto) {
    return this.userService.resetPassword(resetPassword);
  }

  @ApiOperation({
    summary: 'Delete user data',
  })
  @Delete('me/delete')
  remove(@Req() req: AuthRequest) {
    return this.userService.remove(req.user.id);
  }

  @ApiOperation({
    summary: 'Adminsitrative route to get all users ',
  })
  @Get('admin/users')
  getAll() {
    return this.userService.getAll();
  }
}
