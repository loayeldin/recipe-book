import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import {BehaviorSubject} from 'rxjs'
import { tap} from 'rxjs/operators'
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface authResponseData
{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}// مش لازم
@Injectable({providedIn:'root'})
export class AuthService
{
    user = new BehaviorSubject<User>(<User>({}))
    private tokenExpirationTimer:any

    
    constructor(private http:HttpClient,private router:Router){}

    signUp(email:string , password:string)
    {
        return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDA2nakBCiFJGhxLJUxyPNLggFIWAl7lY',
            {
                email:email,
                password:password,
                returnSecureToken:true
            }
        )
        .pipe(
            tap(resData=>{
                this.handleAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
            })
        )
        
       
    }

    signIn(email:string, password:string)
    {
        return this.http
            .post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDA2nakBCiFJGhxLJUxyPNLggFIWAl7lY',
                {
                    email:email,
                    password:password,
                    returnSecureToken:true
                })
                .pipe(
                    tap(resData=>{
                        this.handleAuth(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
                    })
                )
    }

   private handleAuth(email:string,userId:string,token:string,expiresIn:number)
    {
        const expirationDate = new Date( new Date().getTime()+ expiresIn*1000) // مش فاهمها اوي
       


        const newUser = new User(email,userId,token,expirationDate)
        this.user.next(newUser)
        this.autoLogout(expiresIn*1000)
        console.log(this.user.value)
        localStorage.setItem('userData',JSON.stringify(newUser))

        this.autoLogin()
        
    }
    autoLogin()
    {
        const userDataString = localStorage.getItem('userData');

        if (!userDataString) {
            // No user data found in localStorage, handle this case as needed (e.g., redirect to login page)
            return ;
        }

        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(userDataString);
        if(!userData)
        {
            return
        }
        
            const loadUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))

            if(loadUser.token )
            {
                this.user.next(loadUser)
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
                this.autoLogout(expirationDuration)
            }
        

    }

    logOut()
    {
          this.user.next(<User>({})) // حل عشوائي

    localStorage.removeItem('userData')
      this.router.navigate(['/auth'])
      // user = new BehaviorSubject<User>(<User>({}))
      if(this.tokenExpirationTimer)
      {
        clearTimeout(this.tokenExpirationTimer)
      }
    this.tokenExpirationTimer = null
    
    }

    autoLogout(expirationDuration:number)
    {
        console.log(expirationDuration);
        
       this.tokenExpirationTimer= setTimeout(() => {
            this.logOut()
            
        }, expirationDuration);
    }



}