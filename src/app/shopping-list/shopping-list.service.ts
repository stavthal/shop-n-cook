import { Ingredient } from '../shared/ingredient-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = [];

  ingredientsAdded = new Subject<Ingredient[]>();

  ingredient_1 = new Ingredient('Apples', 5);
  ingredient_2 = new Ingredient('Tomatoes', 10);

  constructor() {
    this.ingredients.push(this.ingredient_1);
    this.ingredients.push(this.ingredient_2);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsAdded.next(this.ingredients.slice());
  }
}
