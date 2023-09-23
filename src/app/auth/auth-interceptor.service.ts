import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { CloneVisitor } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user=>{
                if(user.token)
                {
                    console.log(req,req.clone)
                    const modifiedReq = req.clone({params:new HttpParams().set('auth',user.token)})
                    console.log(req,req.clone,modifiedReq)
                    return next.handle(modifiedReq)
                }
                return next.handle(req)
            }))
   
    }

}