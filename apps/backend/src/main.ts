/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser())
  //app.use(bodyParser.json({limit: '100mb'}));
  //app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

  app.enableCors({
    credentials: true,
    origin:[
      "http://localhost:4200",
      "http://localhost:4200/",
      "http://127.0.0.1:4200",
      "http://127.0.0.1:4200/",
    ],
  })
  app.useStaticAssets(join(__dirname, '/static'), {
    prefix: '/static/', index: false
  });
  const port = process.env.PORT || 8000;
  await app.listen(port);
}

bootstrap();
