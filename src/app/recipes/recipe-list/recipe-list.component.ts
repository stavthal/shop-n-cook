import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Model
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = []; // Making an array of Recipes that follow the recipe model

  test_recipe: Recipe = new Recipe(
    'A Test Recipe',
    'This is simply a test description',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFAN6MNhsIFJX1arZEqkxdG5-S7alw0isyawaaSKQjg&s',
  );

  constructor() {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit() {
    this.recipes.push(this.test_recipe);
  }
}
