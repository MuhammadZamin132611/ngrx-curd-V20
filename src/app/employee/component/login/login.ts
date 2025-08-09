import { Component } from '@angular/core';
import { MaterialModule } from '../../../Material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  protected readonly loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      localStorage.setItem('login',JSON.stringify(this.loginForm.value));
      this.toastr.success('', 'Successfully Login')
      this.router.navigateByUrl('/employee');
      console.log("Valid", this.loginForm.value);
    }
    else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please Enter Email and Passowrd', 'Use your Crediential')
      console.log("InValid", this.loginForm.value);
    }
  }


}
