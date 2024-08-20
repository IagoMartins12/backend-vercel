import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryManService } from './delivery_man.service';
import { CreateDeliveryManDto } from './dto/create-delivery_man.dto';
import { UpdateDeliveryManDto } from './dto/update-delivery_man.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetDeliveryManDto } from './dto/get-delivery_man.dto';

@ApiBearerAuth()
@ApiTags('delivery-man')
@Controller('delivery-man')
export class DeliveryManController {
  constructor(private readonly deliveryManService: DeliveryManService) {}

  @ApiOperation({
    summary: 'Administrative route to register delivery man',
  })
  @Post('admin')
  create(@Body() createDeliveryManDto: CreateDeliveryManDto) {
    return this.deliveryManService.create(createDeliveryManDto);
  }

  @ApiOperation({
    summary: 'Administrative route to get all Delivery mans',
  })
  @ApiOkResponse({
    type: GetDeliveryManDto,
    isArray: true,
  })
  @Get('admin')
  findAll() {
    return this.deliveryManService.findAll();
  }
  @ApiOperation({
    summary: 'Administrative route to get unique delivery man',
  })
  @ApiOkResponse({
    type: GetDeliveryManDto,
  })
  @Get('admin:id')
  findOne(@Param('id') id: string) {
    return this.deliveryManService.findOne(id);
  }

  @ApiOperation({
    summary: 'Administrative route to update a delivery man data',
  })
  @Patch('admin/:id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryManDto: UpdateDeliveryManDto,
  ) {
    return this.deliveryManService.update(id, updateDeliveryManDto);
  }
  @ApiOperation({
    summary: 'Administrative route to delete a delivery man data',
  })
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.deliveryManService.remove(id);
  }
}
