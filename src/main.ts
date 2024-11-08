import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/HttpExceptionHandler';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('secret'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('clinik')
    .setDescription('clinik using graphql')
    .addTag('clinik')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('graphql', app, document);
  await app.listen(3000);
}
bootstrap();
