import { Component, OnInit } from '@angular/core';

// Model
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
  }

  constructor(private shoppinglistService: ShoppingListService) {
    this.shoppinglistService.ingredientsAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      },
    );
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppinglistService.addIngredient(ingredient);
  }
}
