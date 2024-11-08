import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as jalaali from 'jalaali-js';
export function IsNotInThePast(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotInThePast',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true; // skip validation if no value is provided
          const [jy, jm, jd] = value.split('-').map(Number);
          console.log(jy, jm, jd);
          const gregorianDate = jalaali.toGregorian(jy, jm, jd);
          const dateValue = new Date(
            gregorianDate.gy,
            gregorianDate.gm - 1,
            gregorianDate.gd,
          );
          const today = new Date();
          today.setHours(0, 0, 0, 0); // remove time portion for comparison
          return dateValue >= today;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be in the past`;
        },
      },
    });
  };
}
