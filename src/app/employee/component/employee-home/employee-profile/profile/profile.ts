import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile-service';
import { LoginModel } from '../../../../model/login.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../../Material.module';
import { Store } from '@ngrx/store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MaterialModule, ReactiveFormsModule, NgClass],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  profileForm: FormGroup;
  userId!: string;

  constructor(private profileService: ProfileService, private fb: FormBuilder, private store: Store) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: ['']
    })
    const userData = localStorage.getItem('login')
    if (userData != null) {
      const parsedUser = JSON.parse(userData);
      const id = parsedUser.id;
      this.userId = id;
    }
  }

  userData!: LoginModel;
  ngOnInit(): void {
    this.profileService.getUserById(this.userId).subscribe({
      next: (data: LoginModel[]) => {
        this.userData = data[0];
        console.log(this.userData);
        this.profileForm.patchValue({
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
          isAdmin: this.userData.isAdmin,
        })
      }
    })
    this.profileForm.get('email')?.disable();
  }

  showHidePassword: boolean = false;
  showPassword() {
    this.showHidePassword = !this.showHidePassword;
  }

  submitForm() {
    if (this.profileForm.valid) {
      console.log('Valid', this.profileForm.value);
    }
    else {
      this.profileForm.markAllAsTouched();
      console.log('In-Valid', this.profileForm.value);
    }
  }

}
