import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For development only
  const corsOptions = {
    origin: ['http://localhost:3001', 'https://lms.corpsoft.io'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'OPTIONS', 'POST', 'DELETE'],
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Lms')
    .setDescription('The Lms API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const host = configService.get('HOST');

  app.use('/robots.txt', express.static(join(__dirname, '..', 'robots.txt')));

  await app.listen(3005, host);
  console.log(`Lms listening on port ${port} on ${await app.getUrl()}`);
}
bootstrap();
