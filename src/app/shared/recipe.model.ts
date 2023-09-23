import { Ingredient } from "./ingredient.model";

export class Recipe
{
name: any;
description: any;
imagePath: any;
ingredients!:Ingredient[]
    constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[])
    {
        this.name = name,
        this.description = desc,
        this.imagePath = imagePath
        this.ingredients = ingredients
    }
}