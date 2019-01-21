import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-common-nav',
  templateUrl: './common-nav.component.html',
  styleUrls: ['./common-nav.component.css']
})
export class CommonNavComponent implements OnInit {
	public userFirstName:String='';
  constructor(private _service:AuthService) { }

  ngOnInit() {
    console.log(localStorage.getItem('user_data'),'this is testing');
	  this.userFirstName = (localStorage.getItem('user_data') && localStorage.getItem('user_data')!='undefined') ?  JSON.parse(localStorage.getItem('user_data')).firstName : '';
  }

  logout(){
    this._service.logout();
  }

}
