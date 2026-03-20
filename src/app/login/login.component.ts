import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode: boolean = true;
  fullName: string = '';
  userEmail: string = '';
  contactNumber: string = '';
  communityName: string = '';
  residentialAddress: string = '';
  userPassword: string = '';
  confirmPassword: string = '';
  role: string = ''; // Added role
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit() {
    if (!this.isLoginMode) {
      // Registration mode
      if (this.userPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const userData = {
        fullName: this.fullName,
        email: this.userEmail,
        password: this.userPassword,
        contactNumber: this.contactNumber,
        communityName: this.communityName,
        residentialAddress: this.residentialAddress,
        role: this.isAdmin ? 'admin' : 'user' 
      };

      
      
      this.authService.register(userData)
        .subscribe({
          next: () => {
            this.isLoginMode = true;
            this.errorMessage = '';
            // Clear form fields after successful registration
            this.resetForm();
          },
          error: (error) => {
            if (error.error.message.includes('email')) {
              this.errorMessage = 'Email already registered';
            } else if (error.error.message.includes('community')) {
              this.errorMessage = 'Community not found. Please contact administrator.';
            } else {
              this.errorMessage = error.error.message || 'Registration failed';
            }
          }
        });
    } else {
      // Login mode
      this.authService.login(this.userEmail, this.userPassword, this.role).subscribe({
        next: (response: any) => {
          this.userService.setUser({
            token: response.token,
            fullName: response.fullName,
          });

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = 'Invalid email or password';
        }
      });
    }
  }

  private resetForm() {
    this.fullName = '';
    this.userEmail = '';
    this.contactNumber = '';
    this.communityName = '';
    this.residentialAddress = '';
    this.userPassword = '';
    this.confirmPassword = '';
    this.isAdmin = false;
  }
}


