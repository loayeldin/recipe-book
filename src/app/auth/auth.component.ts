import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService,authResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn=true;
  isLoading=false;
  errorMessage = null
  constructor(private authService:AuthService,private  router:Router) { }

  ngOnInit() {
  }

  onswitchMode()
  {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(this.isLoggedIn)
  }

  onSubmit(form:NgForm)
  {
    let email = form.value.email
    let password = form.value.password
    let authObs :Observable<authResponseData>
    this.isLoading = true
    console.log(form.value)
    if(this.isLoggedIn)
    {
      console.log(form.value)
      authObs = this.authService.signIn(email,password)
      
    }
    else
    {
      authObs =this.authService.signUp(email,password)
    }

    authObs.subscribe(
      Response=>{
        console.log(Response)
        this.isLoading = false
        this.errorMessage = null
        this.router.navigate(['/recipe'])
      },
      (error)=>
      {
        console.log(error.error.error.message)
        this.errorMessage = error.error.error.message
        this.isLoading = false
      }
    )
  }

}
