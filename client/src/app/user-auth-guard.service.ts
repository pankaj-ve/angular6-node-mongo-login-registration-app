import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('user_data')) {
        // logged in so return true
        return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
