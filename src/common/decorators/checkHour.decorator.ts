import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as jalaali from 'jalaali-js'
export function IsNotInThePastTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotInThePastTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(args.object['date'])
          let date=args.object['date']
          const [jy, jm, jd] = date.split('-').map(Number);
          const gregorianDate = jalaali.toGregorian(jy, jm, jd);
          const dateValue = new Date(gregorianDate.gy,gregorianDate.gm-1,gregorianDate.gd);
          const today = new Date();
          today.setHours(0, 0, 0, 0)
          
          if (dateValue>today) return true
          const now = new Date().getHours();
          return value > now;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be in the past`;
        }
      }
    });
}
}
