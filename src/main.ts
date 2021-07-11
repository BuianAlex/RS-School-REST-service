import path from 'path';

import YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import { config } from './common/config';

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

async function bootstrap() {
  const app = config.USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      )
    : await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('docs', app, swaggerDocument);
  await app.listen(config.PORT);
}
bootstrap();
