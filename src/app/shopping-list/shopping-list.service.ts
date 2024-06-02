import { Ingredient } from '../shared/ingredient-model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = [];

  ingredientsAdded = new EventEmitter<Ingredient[]>();

  ingredient_1 = new Ingredient('Apples', 5);
  ingredient_2 = new Ingredient('Tomatoes', 10);

  constructor() {
    this.ingredients.push(this.ingredient_1);
    this.ingredients.push(this.ingredient_2);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsAdded.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
