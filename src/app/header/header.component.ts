import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {  AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
 
  isAuthenticated = false
  isLoading=false;
  userSub!:Subscription
  constructor(private dataStorage:DataStorageService,private authService:AuthService,private router:Router) { }


  ngOnInit() {
    this.userSub=this.authService.user.subscribe(
      user=>{
        if(user.token)
        {
          this.isAuthenticated = !!user
          console.log(this.isAuthenticated)
        }
      
 
       

      }
    )
  }
  
  logOut()
  {
    this.authService.user.next(<User>({})) // حل عشوائي
    this.router.navigate(['/Auth'])
    this.isAuthenticated = false // حل عشوائي
    // user = new BehaviorSubject<User>(<User>({}))
  }
  saveData()
  {
    this.isLoading=true;
    this.dataStorage.setRecipe()
  }
  fetchData()
  {
    this.dataStorage.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
