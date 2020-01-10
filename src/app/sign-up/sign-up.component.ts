import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { ValidatorsService } from '../core/services/validators.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public isSignUpFailed = false;

  public signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordForConfirmation: new FormControl('', []),
  });

  constructor(
    private userService: UserService,
    private validatorsService: ValidatorsService,
  ) {}

  ngOnInit() {
    this.passwordForConfirmation.setValidators([
      Validators.required,
      this.validatorsService.matchPassword(this.signUpForm),
    ]);
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get passwordForConfirmation() {
    return this.signUpForm.get('passwordForConfirmation');
  }

  submit(): void {
    const isValidationAllClear = !this.signUpForm.invalid;
    if (isValidationAllClear) {
      this.userService
        .create({
          displayName: this.name.value,
          email: this.email.value,
          password: this.password.value,
        })
        .catch(() => (this.isSignUpFailed = true));
    }
  }
}
