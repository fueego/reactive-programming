import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function httpAddressValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value: addressValue } = control;

    if (!addressValue) {
      return null;
    }

    if (
      !addressValue.match(/^http[s]?:\/\/+[\w]+.[\w]+.([\w]{3}|[\w]{2})$/gi)
    ) {
      return { noHttp: true };
    }

    return null;
  };
}
