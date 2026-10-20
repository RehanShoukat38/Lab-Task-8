import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export function createValidationPipe() { return new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, exceptionFactory: (errors: ValidationError[]) => new BadRequestException({ statusCode: 400, error: 'Validation failed', details: errors.flatMap(e => Object.values(e.constraints ?? {})) }) }); }
