import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],

})
export class RecipesComponent implements OnInit {

  selectedRecipe!:Recipe
  constructor(private recipeService:RecipeService,private dataStorage:DataStorageService) { }

  ngOnInit() {
    // this.recipeService.selectedRecipe.subscribe(
    //   (recipe:Recipe)=>
    //   {
    //     this.selectedRecipe = recipe

    this.dataStorage.fetchData().subscribe()
    //   }
    // )
  }

}
