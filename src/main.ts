import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from 'config/cors.config';
import { validationConfig } from 'config/validation.config';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
