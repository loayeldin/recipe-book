
import { Component, OnInit, ViewChild,ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slF!:NgForm
  editedItemIndex!:number
  editedItem!:Ingredient
  editMode = false
  constructor(private Sls:ShoppingListService) { }

  ngOnInit() {
    this.Sls.startEditing.subscribe(
      (index:number)=>{
        this.editMode = true
        this.editedItemIndex = index
       this.editedItem =  this.Sls.getIngredientById(this.editedItemIndex)
        this.slF.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  addItem(form:NgForm)
  {
    const value = form.value
    const newIng = new Ingredient(value.name,value.amount)
    if(this.editMode)
    {
      this.Sls.updateIngredient(this.editedItemIndex, newIng)
    }else
    {
      this.Sls.addIngredient(newIng)
    }
    this.editMode = false
    form.reset()
  }
  onClear()
  {
  
    this.slF.reset()
    this.editMode = false
  }
  onDelete()
  {
    this.onClear()
    this.Sls.DeleteIngredient(this.editedItemIndex)
  }
}

