import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "../shared/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>
{
    constructor(private dataStorageService:DataStorageService, private recipeService:RecipeService ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        const recipes = this.recipeService.getRecipe() //عشان ميعملش باج وانا بعمل ايديت في ال recipe 
        if(recipes.length ===0) //عشان ميعملش باج وانا بعمل ايديت في ال recipe 
        {
            return this.dataStorageService.fetchData()
        }
        else
        {
            return recipes
        }
        
        
    }

}