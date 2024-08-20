import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { StateService } from './state.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateStateDto } from './dto/update-state-dtop';
import { CreateStateDto } from './dto/create-state-dto';
import { GetStateDto } from './dto/get-state-dtop';

@ApiTags('state')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiOperation({
    summary: 'Get all states',
  })
  @ApiOkResponse({
    type: GetStateDto,
    isArray: true,
  })
  @IsPublic()
  @Get('')
  findAll() {
    return this.stateService.findAll();
  }

  @ApiOperation({
    summary: 'Get a specific states',
  })
  @ApiOkResponse({
    type: GetStateDto,
  })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findById(id);
  }

  @ApiOperation({
    summary: 'Update a order state',
  })
  @ApiBearerAuth()
  @Patch('')
  udate(@Body() stateDto: UpdateStateDto) {
    return this.stateService.updateOrder(stateDto);
  }

  @ApiOperation({
    summary: 'Administrative route to create a state',
  })
  @ApiBearerAuth()
  @Put('admin/')
  create(@Body() createTypePagamentDto: CreateStateDto) {
    return this.stateService.create(createTypePagamentDto);
  }

  @ApiOperation({
    summary: 'Administrative route to update a state',
  })
  @ApiBearerAuth()
  @Patch('admin/:id')
  update(
    @Param('id') id: string,
    @Body() createTypePagamentDto: CreateStateDto,
  ) {
    return this.stateService.update(id, createTypePagamentDto);
  }
  @ApiOperation({
    summary: 'Administrative route to delete a state',
  })
  @ApiBearerAuth()
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(id);
  }
}
