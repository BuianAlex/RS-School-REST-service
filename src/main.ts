import path from 'path';

import YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';

import { config } from './common/config';

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

async function bootstrap() {
  const app = config.USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
          logger: ['error', 'warn'],
        }
      )
    : await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
      });
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('docs', app, swaggerDocument);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  if (config.USE_FASTIFY) {
    await app.listen(config.PORT, '0.0.0.0');
  } else {
    await app.listen(config.PORT);
  }
}

bootstrap();
