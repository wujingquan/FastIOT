// see https://docs.nestjs.com/techniques/validation

// eslint-disable-next-line
import { ValidationPipeOptions, BadRequestException } from '@nestjs/common';

export const ValidationOptions: ValidationPipeOptions = {
  forbidNonWhitelisted: false,
  whitelist: true,
  forbidUnknownValues: true,
  transform: true,
  // exceptionFactory: errors => new BadRequestException(errors)
  // validateCustomDecorators: true,
};
