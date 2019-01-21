import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public loading = false;
  public user = {};
  public errorMsg;
  constructor(private _router: Router, private authService:AuthService) { }

  ngOnInit() {
  }


register(){
  this.authService.register(this.user).subscribe(
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
