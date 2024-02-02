import { ValidateIf, ValidationOptions } from 'class-validator';

/**
 * https://github.com/typestack/class-validator/issues/491
 */

/**
 * Skips validation if the target is null
 */
export function IsNullable(options?: ValidationOptions): PropertyDecorator {
  return function IsNullableDecorator(
    prototype: any,
    propertyKey: string | symbol,
  ) {
    ValidateIf((obj): boolean => obj[propertyKey] !== null, options)(
      prototype,
      propertyKey,
    );
  };
}

/**
 * Skips validation if the target is undefined
 */
export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
  return function IsUndefinableDecorator(
    prototype: any,
    propertyKey: string | symbol,
  ) {
    ValidateIf((obj): boolean => obj[propertyKey] !== undefined, options)(
      prototype,
      propertyKey,
    );
  };
}

export function IsStringEmptiable(
  options?: ValidationOptions,
): PropertyDecorator {
  return function IsStringEmptiableDecorator(
    prototype: any,
    propertyKey: string | symbol,
  ) {
    ValidateIf((obj): boolean => obj[propertyKey] !== '', options)(
      prototype,
      propertyKey,
    );
  };
}
