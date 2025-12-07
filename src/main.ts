import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logs from 'morgan';
import { config } from 'dotenv';
import { ValidationInterceptor } from '@Application/api/interceptors/validation.interceptor';
import { VALIDATION_SERVICE } from '@Application/config/inject-tokens/auth.tokens';
import { TransformDataInterceptor } from '@Application/api/interceptors/transform-data.interceptor';
import { ParseQueryParamsMiddleware } from '@Application/api/middlewares/parse-query-params.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const validationService = app.get(VALIDATION_SERVICE);
  const reflector = app.get(Reflector);
  app.use(logs(process.env.LOGGER_TYPE ?? 'dev'))
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:4200', process.env.FRONTEND_URI] });
  app.useGlobalInterceptors(
    new ValidationInterceptor(validationService, reflector),
    new TransformDataInterceptor(reflector)
  );
  app.use(new ParseQueryParamsMiddleware().use);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Gorenas API')
    .setDescription(`
# Gorenas Restaurant Management System API

## Overview
Complete REST API for restaurant management including authentication, user management, sales tracking, and more.

## Authentication
Most endpoints require JWT authentication. After logging in via \`/api/auth/authenticate\`, include the JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your_token>
\`\`\`

## Response Format
All endpoints return data in a consistent format:
\`\`\`json
{
  "data": { ... }  // or array for list endpoints
}
\`\`\`

Error responses:
\`\`\`json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
\`\`\`

## Common Query Parameters
- \`edition=true\`: Returns original model without transformation (for edit forms)
- \`query\`: Search term for filtering results
- \`role\`: Filter by user role

## Modules
- **Auth**: Authentication and authorization
- **Users**: User account management  
- **Persons**: Personal information management
- **Roles**: Role and permission management
- **Permissions**: Fine-grained access control
- **Restaurants**: Restaurant entity management
- **Branches**: Branch/location management
- **Employees**: Employee data and assignments
- **Sales**: Sales transactions and reporting
    `)
    .setVersion('1.0')
    .setContact('Gorenas Team', '', 'contact@gorenas.com')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Persons', 'Person management endpoints')
    .addTag('Roles', 'Role management endpoints')
    .addTag('Permissions', 'Permission management endpoints')
    .addTag('Restaurants', 'Restaurant management endpoints')
    .addTag('Branches', 'Branch management endpoints')
    .addTag('Employees', 'Employee management endpoints')
    .addTag('Sales', 'Sales management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Gorenas API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api/docs`);
}
bootstrap();
