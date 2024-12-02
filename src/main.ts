import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logs from 'morgan';
import { config } from 'dotenv';

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logs(process.env.LOGGER_TYPE ?? 'dev'))
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:4200', process.env.FRONTEND_URI] })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
