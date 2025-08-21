import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile-service';
import { LoginModel } from '../../../../model/login.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  userId!:string;

  constructor(private profileService:ProfileService){
    const userData = localStorage.getItem('login')
    if (userData != null) {
      const parsedUser = JSON.parse(userData);
      const id = parsedUser.id;
      this.userId = id;
    }
  }

  ngOnInit(): void {
      this.profileService.getUser().subscribe({
        next:(data:LoginModel)=>{
          console.log(data);
        }
      })
  }

}
