import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  public user = {}
  public loader;
  public errorMsg;
  public sucsMsg;
  constructor( private _router: Router, private authService:AuthService) { }
// 
  ngOnInit() {

  }

  login(){
    this.authService.login(this.user).subscribe(
      (result)=>{
        if(!result){
          this.errorMsg = 'Internal server error.';
        }
        else{
          if(result &&result['statusCode']==200){
            localStorage.setItem('user_data', JSON.stringify(result['statusCode']));
            this._router.navigate(['home']);
          }
          else{
            this.errorMsg = result['statusMessage'];
          }

        }
        
      },
      (error)=>{ }
    );
  }

}
