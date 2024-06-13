import { Component, OnDestroy, OnInit } from '@angular/core';

// Model
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription | undefined;

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igChangeSub = this.shoppinglistService.ingredientsAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      },
    );
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
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

  onIngredientEdit(index: number) {
    this.shoppinglistService.startedEditing.next(index);
  }
}
