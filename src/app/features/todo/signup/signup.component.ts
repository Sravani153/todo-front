import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountDTO } from 'src/app/model/AccountDTO';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
     private accountService: AccountService,
     public snackBar: MatSnackBar,  // Change snackBar to public
     private router: Router
    )
   {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { confirmPassword, ...accountData } = this.signupForm.value;

      accountData.role = 'USER';

      console.log('Submitting account data:', accountData);

      this.accountService.createAccount(accountData as AccountDTO).subscribe(
        response => {
          this.snackBar.open('Account created successfully!', 'Close', { duration: 3000 });
          this.router.navigateByUrl('/login');
        },
        error => {
          console.log('Error occurred:', error);
          if (error.status === 409) {
            this.snackBar.open('Account with this email already exists.', 'Close', { duration: 3000 });
          } else {
            this.snackBar.open('Error creating account. Please try again.', 'Close', { duration: 3000 });
          }
        }
      );
    }
  }
}
