import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  matchPassword(formGroup: FormGroup): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = formGroup.get('password').value;
      const isMatched = (control.value === password);
      return isMatched ?  null : {'matchPassword': {value: control.value}};
    };
  }
}
