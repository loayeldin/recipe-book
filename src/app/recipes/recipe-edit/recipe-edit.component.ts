import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import{FormGroup,FormControl, FormArray ,Validators} from '@angular/forms'
import { RecipeService } from '../recipe.service';
import {Subscription} from 'rxjs'


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,AfterViewInit {
  id!:number
  editMode = false
  recipeForm!:FormGroup
  subscription!:Subscription
  constructor(private activatedRoute:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router
    ) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.subscription =this.activatedRoute.params.subscribe(
      (Params:Params)=>{
        this.id = +Params['id']
        this.editMode = Params['id'] != null
        console.log(this.editMode)
        this.initForm()
      }
    )
  }

  onSubmit()
  {
    console.log(this.recipeForm.value)

    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }else
    {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }
  initForm()
  {
    let recipeName = ''
    let recipeDesc = ''
    let recipeImg = ''
    let recipeIngredients = new FormArray([])

    if(this.editMode)
    {
      const recipe =this.recipeService.getRecipeById(this.id)
      recipeDesc = recipe.description
      recipeName = recipe.name
      recipeImg = recipe.imagePath
      if(recipe['ingredients'])
      {
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name , Validators.required),
              'amount' :new FormControl(ingredient.amount, 
                Validators.required
             
                )

            })
          )
        }
      }
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImg, Validators.required),
      'description' : new FormControl(recipeDesc,Validators.required),
      'ingredients': recipeIngredients
    })
  }

   get hobbies(): FormArray {


  
    return this.recipeForm.get('ingredients') as FormArray;
  } // مهمه فشخ في form array


  addIngredient()
  {
  
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount': new FormControl(null,Validators.required)
      })
    )
      console.log((<FormArray>this.recipeForm.get('ingredients')))
    
  }


  onCancel()
  {
    this.router.navigate(['../'], {relativeTo:this.activatedRoute})
  }
  DeleteIngredient(id:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id) // مهمه فشخ 
  }
}
