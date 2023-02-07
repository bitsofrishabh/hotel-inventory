import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appCustomValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidatorDirective,
      multi: true,
    },
  ],
})
export class CustomValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        invalidEmailValidator: true,
      };
    }
    return null;
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}
