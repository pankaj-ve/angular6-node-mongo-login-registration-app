import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuardService } from './user-auth-guard.service';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const routes: Routes = [ {
  path: 'login', 
  component: LoginComponentComponent,
},
{
  path: '', 
  redirectTo:'/login',
  pathMatch : 'full'
},
{ 
  path: 'home', 
  component: HomeComponent,
  canActivate: [UserAuthGuardService]
},
{ 
  path: 'register', 
  component: RegisterComponent 

},
{ 
  path: 'forgot-password', 
  component: ForgotPasswordComponent 
},
{ 
  path: 'authentication/verify-email-link', 
  component: ResetPasswordComponent 
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
