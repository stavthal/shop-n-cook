import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFAN6MNhsIFJX1arZEqkxdG5-S7alw0isyawaaSKQjg&s',
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFAN6MNhsIFJX1arZEqkxdG5-S7alw0isyawaaSKQjg&s',
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // return a new array which is an exact copy of the recipes array
  }
}
