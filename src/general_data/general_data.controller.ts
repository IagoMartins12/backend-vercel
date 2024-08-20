import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GeneralDataService } from './general_data.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateGeneralData } from './dto/general_data.dto';

@ApiTags('general-data')
@Controller('general-data')
export class GeneralDataController {
  constructor(private readonly generalDataService: GeneralDataService) {}

  @ApiOperation({
    summary: 'Get general data',
  })
  @ApiOkResponse({
    type: CreateGeneralData,
  })
  @IsPublic()
  @Get()
  findAll() {
    return this.generalDataService.findAll();
  }
  @ApiOperation({
    summary: 'Update general data',
  })
  @Put()
  update(@Body() updateDeliveryManDto: CreateGeneralData) {
    return this.generalDataService.update(updateDeliveryManDto);
  }
}
