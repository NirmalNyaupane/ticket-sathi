import { ValidationOptions, registerDecorator } from "class-validator";

function IsEndDate(
  targetStartDate: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName?: string) {
    registerDecorator({
      name: "isEndDate",
      target: object.constructor,
      propertyName: propertyName ?? "endDate",
      options: validationOptions,
      validator: {
        validate(value: any, args: any) {
          const startDate =
            args?.object?.[targetStartDate] ?? args?.object?.startDate;
          if (startDate) {
            if (new Date(value) > new Date(startDate)) {
              return true;
            } else {
              throw new Error(
                validationOptions?.message
                  ? validationOptions.message.toString()
                  : `${propertyName} must be greater than startDate`
              );
            }
          } else {
            return true;
          }
        },
      },
    });
  };
}

function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isFutureDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          console.log(value);
          if (new Date(value) > new Date(Date.now())) {
            return true;
          } else {
            throw new Error(
              validationOptions?.message
                ? validationOptions.message.toString()
                : `${propertyName} must be a future date`
            );
          }
        },
      },
    });
  };
}

function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPastDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          if (new Date(value) < new Date(Date.now())) {
            return true;
          } else {
            console.log(new Date(value));
            throw new Error(
              validationOptions?.message
                ? validationOptions.message.toString()
                : `${propertyName} must be a past date`
            );
          }
        },
      },
    });
  };
}

export { IsEndDate, IsFutureDate, IsPastDate };
