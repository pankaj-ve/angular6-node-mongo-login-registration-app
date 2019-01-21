import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 

import { CommonNavComponent } from './common-nav/common-nav.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';

import { UserAuthGuardService } from './user-auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { ConfirmEqualValidatorDirective } from './_directive/confirm-equal-validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponent,
    HomeComponent,
    CommonNavComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
//    HttpModule,
    HttpClientModule
  ],
   providers: [UserAuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
