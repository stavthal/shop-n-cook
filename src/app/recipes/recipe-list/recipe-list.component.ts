import { Component, OnDestroy, OnInit } from '@angular/core';

// Model
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipeService.recipesChanged.unsubscribe();
  }

  onNewPress() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
