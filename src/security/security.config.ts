import { DocumentBuilder } from '@nestjs/swagger';

export const SecurityConfig = (builder: DocumentBuilder) => {
  builder.addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });
};
