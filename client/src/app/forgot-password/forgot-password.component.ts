import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public user = {}
  public errorMsg;
  public sucsMsg;
  constructor( private _router: Router, private authService:AuthService) { }

  ngOnInit() {
  }

forgotPassword(){
  this.authService.forgotPassword(this.user).subscribe(
    (result)=>{
      if(!result){
        this.errorMsg = 'Internal server error.';
      }
      else{
        if(result &&result['statusCode']==200){
          this.sucsMsg = result['statusMessage'];
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
