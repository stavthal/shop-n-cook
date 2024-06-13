import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFAN6MNhsIFJX1arZEqkxdG5-S7alw0isyawaaSKQjg&s',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)],
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFAN6MNhsIFJX1arZEqkxdG5-S7alw0isyawaaSKQjg&s',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)],
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe); // adds the recipe to the array of the service
    this.recipesChanged.next(this.recipes.slice()); // emits the new array of recipes
  }

  updateRecipe(name: string, newRecipe: Recipe) {
    const index = this.recipes.findIndex((recipe) => recipe.name === name);

    if (index !== -1) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  getRecipes() {
    return this.recipes.slice(); // return a new array which is an exact copy of the recipes array
  }

  getRecipe(name: string) {
    return this.recipes.find((recipe) => recipe.name === name);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
