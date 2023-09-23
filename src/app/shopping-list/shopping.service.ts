import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
export class ShoppingListService
{
    startEditing = new Subject<number>();
    ingredients:Ingredient[]=
    [
      new Ingredient('apple',2),
      new Ingredient('tomato',4)
    ]
    getIngredients()
    {
        return this.ingredients
    }
    addIngredient(ing:Ingredient)
    {
        this.ingredients.push(ing)
    }
    addIngredients(ingredients:Ingredient[])
    {
        this.ingredients.push(...ingredients)
    }
    getIngredientById(id:number)
    {
        return this.ingredients[id]
    }
    updateIngredient(id:number,newIngredient:Ingredient)
    {
        this.ingredients[id] = newIngredient
    }
    DeleteIngredient(id:number)
    {
        this.ingredients.splice(id,1)
    }
  
}