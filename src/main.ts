import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação - Salty Point')
    .setDescription(
      'Documentação de rotas da aplicação Salty point, englobando tanto as rotas administrativas (CMS) e as rotas clientes',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
    })
    .build();

  app.use(cors());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipes para validação de dados
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3333);
}

bootstrap();
