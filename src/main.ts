import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logs from 'morgan';
import { config } from 'dotenv';
import { ValidationInterceptor } from '@Application/api/interceptors/validation.interceptor';
import { VALIDATION_SERVICE } from '@Application/config/inject-tokens/auth.tokens';
import { TransformDataInterceptor } from '@Application/api/interceptors/transform-data.interceptor';

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const validationService = app.get(VALIDATION_SERVICE);
  const reflector = app.get(Reflector);
  app.use(logs(process.env.LOGGER_TYPE ?? 'dev'))
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:4200', process.env.FRONTEND_URI] });
  app.useGlobalInterceptors(new ValidationInterceptor(validationService, reflector), new TransformDataInterceptor(reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
