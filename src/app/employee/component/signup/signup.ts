import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';
import { LoginService } from '../../services/login-service';
import { LoginModel } from '../../model/login.model';

@Component({
  selector: 'app-signup',
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  protected readonly signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private authService: Auth, private loginService: LoginService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false]
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

  signupSubmit() {
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email!;
      const passsword = this.signupForm.value.passsword!;
      this.loginService.checkEmailExists(email, passsword).subscribe({
        next: (exists: boolean) => {
          if (exists) {
            this.toastr.error('User already registered', 'Error');
          }
          else {
            const _obj: LoginModel = {
              id: this._generateId(),
              name: this.signupForm.value.name,
              email: this.signupForm.value.email,
              password: this.signupForm.value.password,
              isAdmin: this.signupForm.value.isAdmin,
            }

            this.loginService.createId(_obj).subscribe({
              next: () => {
                // localStorage.setItem('login', JSON.stringify(this.signupForm.value));
                this.toastr.success('', 'Successfully Login');
                this.authService.logIn(_obj);
                this.router.navigateByUrl('/dashboard');
              },
              error: (error: any) => {
                this.toastr.error(error.error.message, 'Something Error');
              }
            })
          }
        },
        error: () => {
          this.toastr.error('Error checking email', 'Something Error');
        }
      })
    }
    else {
      this.signupForm.markAllAsTouched();
      this.toastr.error('Please Enter Email and Passowrd', 'Create your Account')
      console.log("InValid", this.signupForm.value);
    }
  }

}
