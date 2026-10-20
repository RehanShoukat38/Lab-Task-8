import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createValidationPipe } from './common/validation';
async function bootstrap() { const app = await NestFactory.create(AppModule); app.setGlobalPrefix('api'); app.useGlobalPipes(createValidationPipe()); await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0'); }
void bootstrap();
