import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { LoginService } from '../../services/login-service';
import { LoginModel } from '../../model/login.model';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  protected readonly loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private authService: Auth, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  _generateId(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      const password = this.loginForm.value.password!;
      const _obj: LoginModel = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      this.loginService.checkUser(email, password).subscribe({
        next: (users: LoginModel[]) => {
          if (users.length > 0) {
            const loggedInUser = users[0]; 
            this.authService.logIn(loggedInUser);
            this.toastr.success('Welcome Back', 'Successfully Login');
            this.router.navigateByUrl('/dashboard');
            console.log("Valid", this.loginForm.value);
          }
          else {
            this.toastr.error('Invalid Email or Password', 'Login Failed');
          }
        },
        error: () => {
          this.toastr.error('Error logging in', 'Something Error');
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please Enter Email and Passowrd', 'Use your Crediential')
      console.log("InValid", this.loginForm.value);
    }
  }


}
