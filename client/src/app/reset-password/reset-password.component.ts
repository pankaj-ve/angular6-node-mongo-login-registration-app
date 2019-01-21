import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public user = {};
  public isValid;
  public loader;
  public errorMsg;
  public sucsMsg;
  public email: string;
  public token: string;

  constructor( private _router: Router,private route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');   
  
    this.authService.verifyForgotLink(this.email,this.token).subscribe(
      (result)=>{
        if(!result){
          this.errorMsg = 'Internal server error.';
        }
        else{
          if(result && result['statusCode']==200){
            this.isValid = true;
          }
          else{
            this.isValid = false; 
          }
  
        }
      },
      (error)=>{ this.errorMsg = 'Internal server error.'; }
    );

  }

  //resetPassword
  resetPassword(){
    this.authService.resetPassword(this.email,this.token,this.user).subscribe(
      (result)=>{
        if(!result){
          this.errorMsg = 'Internal server error.';
        }
        else{
          console.log(result,'pouty');
          if(result && result['statusCode']==200){
            alert(result['statusMessage']);
            this._router.navigate(['login']);
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
