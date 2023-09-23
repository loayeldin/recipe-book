import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import {BehaviorSubject} from 'rxjs'
import { tap} from 'rxjs/operators'
import { User } from "./user.model";

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

    
    constructor(private http:HttpClient){}

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
        console.log(this.user.value)
        
    }
}