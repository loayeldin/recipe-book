import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 
  constructor( private recipeService:RecipeService,
      private router:Router,
      private activatedRoute:ActivatedRoute) { }
  recipes!:Recipe[] 

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe()
    this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes
      }
    )
  }

  newRecipe()
  {
    this.router.navigate(['new'], {relativeTo:this.activatedRoute})
  }
 
}

