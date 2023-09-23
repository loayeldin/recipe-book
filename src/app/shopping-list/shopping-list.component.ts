import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private Sls:ShoppingListService) { }
  ingredients!:Ingredient[]


  ngOnInit() {
      this.ingredients = this.Sls.getIngredients()
  }

  editItem(index:number)
  {
    this.Sls.startEditing.next(index)
  }

 

}
