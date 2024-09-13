import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { UserstorageService } from 'src/app/storage/userstorage.service';
import { AuthResponse } from 'src/app/model/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private userStorageServ: UserstorageService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'OK', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      return;
    }

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    this.authService.login(email, password).subscribe(
      (success: boolean) => {
        if (success) {
          const userRole = this.userStorageServ.getUserRole();
          console.log('Login Success - User Role:', userRole);

          if (userRole === 'ADMIN') {
            this.snackBar.open('Logged In Successfully as Admin.', 'OK', { duration: 5000 });
            this.router.navigateByUrl('/list');
          } else if (userRole === 'USER') {
            this.snackBar.open('Logged In Successfully as User.', 'OK', { duration: 5000 });
            this.router.navigateByUrl('/list');
          }
        } else {
          this.snackBar.open('Login failed', 'ERROR', { duration: 5000, panelClass: 'error-snackbar' });
        }
      },
      (error) => {
        this.snackBar.open('Bad Credentials', 'ERROR', { duration: 5000, panelClass: 'error-snackbar' });
        console.error('Login failed', error);
      }
    );
  }

  }

