import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userFirstName;
  public users;
  constructor(private data : AuthService) { }

  ngOnInit() {
      this.userFirstName = localStorage.getItem('user_data') ?  JSON.parse(localStorage.getItem('user_data')).firstName : '';
      this.data.getUsers()
      .subscribe(userData => {
          this.users = userData; 
      });    

  }

}
