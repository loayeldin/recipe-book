import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "../shared/recipe.model";
import { ShoppingListService } from "../shopping-list/shopping.service";
@Injectable()
export class RecipeService
{
   recipeChanged = new Subject<Recipe[]>();
  constructor(private Sls:ShoppingListService){}
    // recipes:Recipe[] = [
    //     new Recipe(
    //       'burger',
    //       'wwwwwww', 'https://image.shutterstock.com/z/stock-photo-fresh-tasty-burger-isolated-on-white-background-705104968.jpg',
    //       [
    //         new Ingredient('meat',1),
    //         new Ingredient('french fries',20)
    //       ]
    //       ),
    //     new Recipe('chicken','soo gooood', 'https://image.shutterstock.com/z/stock-photo-fresh-tasty-burger-isolated-on-white-background-705104968.jpg',
    //     [
    //       new Ingredient('buns',2),
    //       new Ingredient('meat',1)
    //     ])
    
    //   ]

      recipes:Recipe[] =[]

      setRecipes(recipes:Recipe[])
      {
          this.recipes = recipes
          this.recipeChanged.next(this.recipes)
      }

      getRecipe()
      {
        return this.recipes
      }
      OnaddToShoppingList(ingredients:Ingredient[])
      {
        this.Sls.addIngredients(ingredients)
      }
      getRecipeById(id:number)
      {
        return this.recipes[id]
        
      }
      addRecipe(newRecipe:Recipe)
      {
        this.recipes.push(newRecipe)
     
      
      }
      updateRecipe(id:number,newRecipe:Recipe)
      {
        this.recipes[id]= newRecipe
        this.recipeChanged.next(this.recipes)
      }
      deleteRecipe(id:number)
      {
        this.recipes.splice(id,1)
        this.recipeChanged.next(this.recipes)
      }
    
}