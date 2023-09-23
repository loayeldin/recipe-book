import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map,take,tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'}) // مش فاهمها
export class DataStorageService
{
    constructor(private http:HttpClient, private recipeService:RecipeService,private authService:AuthService ){}
    setRecipe()
    {
        const recipes = this.recipeService.getRecipe()
        console.log(recipes)
         this.http
            .put('https://reciepe-book-9b0d8-default-rtdb.firebaseio.com/recipes.json',
            recipes)
                .subscribe(
                (response)=>{console.log(response)}
                )
    }


    // fetchData()
    // {
    //     return this.http
    //         .get<Recipe[]>('https://reciepe-book-9b0d8-default-rtdb.firebaseio.com/recipes.json')
    //         .pipe(
    //             tap(recipes=>{
    //                 this.recipeService.setRecipes(recipes)
    //             })
    //         )
            
    // }
    fetchData() {
      
            return this.http
            .get<Recipe[]>('https://reciepe-book-9b0d8-default-rtdb.firebaseio.com/recipes.json')

            .pipe(
              map(recipes => {
                return recipes.map(recipe => {
                  console.log('from map',recipe)
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                  };
                });
              }),
              tap(recipes => {
                 
                this.recipeService.setRecipes(recipes);
              })

            )

       
        
       
          
      }

   
    
}

