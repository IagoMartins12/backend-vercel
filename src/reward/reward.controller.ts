import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RewardService } from './reward.service';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { CreateRewardDto, CreateRewardUserDto } from './dto/create-reward.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { GetRewardDto } from './dto/get-reward.dto';
import { GetUserRewardDto } from './dto/get-user-reward.dto';

@ApiTags('reward')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @ApiOperation({
    summary: 'Get all avaliable rewards',
  })
  @ApiOkResponse({
    type: GetRewardDto,
    isArray: true,
  })
  @IsPublic()
  @Get()
  findAllReward() {
    return this.rewardService.findAll();
  }

  @ApiOperation({
    summary: 'Catch a reward to user',
  })
  @Post()
  @ApiBearerAuth()
  createReward(
    @Body() createRewardUserDto: CreateRewardUserDto,
    @Req() req: AuthRequest,
  ) {
    return this.rewardService.catchReward(req.user, createRewardUserDto);
  }

  @ApiOkResponse({
    type: GetUserRewardDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Get user avaliable rewards',
  })
  @ApiBearerAuth()
  @Get('/user')
  findUserReward(@Req() req: AuthRequest) {
    return this.rewardService.getUserRewards(req.user);
  }

  @ApiOperation({
    summary: 'Administrative route to create a reward',
  })
  @ApiBearerAuth()
  @Post('/admin')
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.create(createRewardDto);
  }

  @ApiOperation({
    summary: 'Administrative route to get all rewards used',
  })
  @ApiBearerAuth()
  @Get('admin/users')
  getRewards() {
    return this.rewardService.findAllRewardUsers();
  }

  @ApiOperation({
    summary: 'Administrative route to update a reward',
  })
  @ApiBearerAuth()
  @Patch('admin/:id')
  update(@Body() createRewardDto: CreateRewardDto, @Param('id') id: string) {
    return this.rewardService.update(id, createRewardDto);
  }

  @ApiOperation({
    summary: 'Administrative route to delete a reward',
  })
  @ApiBearerAuth()
  @Delete('admin/:id')
  delete(@Param('id') id: string) {
    return this.rewardService.delete(id);
  }
}
