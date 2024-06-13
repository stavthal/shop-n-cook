import { Ingredient } from '../shared/ingredient-model';
import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = [];

  ingredientsAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  editIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsAdded.next(this.ingredients.slice());
  }
}
