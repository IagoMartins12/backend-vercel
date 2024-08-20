import { PartialType } from '@nestjs/swagger';
import { CreateGeneralData } from './general_data.dto';

export class UpdateGeneralData extends PartialType(CreateGeneralData) {
  id: string;
}
