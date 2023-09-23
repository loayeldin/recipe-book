import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

   recipe!:Recipe
  id!:number
  constructor(private recipeService:RecipeService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params:Params)=>
      {
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipeById(this.id)
      }
    )
  }
  addToShoppingList()
  {
    this.recipeService.OnaddToShoppingList(this.recipe.ingredients)
  }
  editRecipe()
  {
    this.router.navigate(['edit'], {relativeTo:this.activatedRoute})
  }
  DeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipe'])
  }

}
