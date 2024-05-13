import { Component, OnInit } from '@angular/core';

// Model
import { Ingredient } from '../shared/ingredient-model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  ingredient_1 = new Ingredient('Apples', 5);
  ingredient_2 = new Ingredient('Tomatoes', 10);

  constructor() {}

  ngOnInit() {
    this.ingredients.push(this.ingredient_1);
    this.ingredients.push(this.ingredient_2);
  }
}
