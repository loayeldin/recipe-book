import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard canActivate method called');
    return this.authService.user.pipe(
      take(1),
      tap(user => console.log('User:', user.token)),
      map(user => {
       
        if (user.token !== undefined) {          
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
    
    // ... rest of your code
  }
  
  
}
