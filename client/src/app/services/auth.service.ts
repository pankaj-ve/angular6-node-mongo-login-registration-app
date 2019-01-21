import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient,HttpHeaders } from'@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private _router: Router, private http: HttpClient){}
  
  logout() {
    localStorage.removeItem('user_data');
    this._router.navigate(['login']);
  }
  

  // login user
  login(user) : Observable<any[]>{
    let data = { email: user['email'], password: user['password']};
    let bodyString = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json ');
    return this.http.post<any[]>(environment.apiUrl+"/user/login",bodyString,{headers});
    
  }

  // register api
  register(user) : Observable<any[]>{
    let bodyString = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json ');
    return this.http.post<any[]>(environment.apiUrl+"/user/register",bodyString,{headers});
  }
  // reset password---
  resetPassword(email,token, password) : Observable<any[]>{
    let data ={ email: email, password: password.password,token:token};
    let bodyString = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json ');
    return this.http.post<any[]>(environment.apiUrl+"/user/login",bodyString,{headers});
    
  }
  
  // get user list
  getUsers() : Observable<any[]>{
    return this.http.get<any[]>("https://jsonplaceholder.typicode.com/users");
  }

  verifyForgotLink(email,token) {
    return this.http.get<any[]>(`http://localhost:3000/user/verify-forgot-link?email=${email}&token=${token}`);
  }

  // forgot password
  forgotPassword(user) : Observable<any[]>{
    let data = { email: user['email']};
    let bodyString = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json ');
    return this.http.post<any[]>(environment.apiUrl+"/user/forgot-password",bodyString,{headers});
    
  }


}