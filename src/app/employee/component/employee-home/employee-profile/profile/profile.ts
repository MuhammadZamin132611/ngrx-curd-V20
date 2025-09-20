import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile-service';
import { LoginModel } from '../../../../model/login.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../../Material.module';
import { Store } from '@ngrx/store';
import { NgClass } from '@angular/common';
import * as ProfileActions from '../../../../../store/profile/profile.actions'
import { selectSelectedUser } from '../../../../../store/profile/profile.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [MaterialModule, ReactiveFormsModule, NgClass],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  profileForm: FormGroup;
  user$: any;
  userId!: string;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.user$ = this.store.select(selectSelectedUser);
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: ['']
    })
    const userData = localStorage.getItem('login')
    if (userData != null) {
      const parsedUser = JSON.parse(userData);
      this.userId = parsedUser.id
      this.store.dispatch(ProfileActions.loadProfileById({ id: parsedUser.id }));
    }
  }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (data: LoginModel) => {
        this.profileForm.patchValue(data)
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
      const updatedData = this.profileForm.getRawValue();
      this.store.dispatch(ProfileActions.updateProfile({ id: this.userId, changes: updatedData }))

      const existingLogin = localStorage.getItem('login');
      if (existingLogin) {
        const parsed = JSON.parse(existingLogin);
        const updatedLogin = { ...parsed, ...updatedData }; // merge old + new
        localStorage.setItem('login', JSON.stringify(updatedLogin));
      }

      this.router.navigateByUrl('/dashboard')
    }
    else {
      this.profileForm.markAllAsTouched();
    }
  }

}
