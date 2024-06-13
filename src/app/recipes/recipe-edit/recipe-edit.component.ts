import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  name: string;
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.name = params['name'];
      this.editMode = params['name'] != null;
    });

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.name);
    }
  }

  ngOnDestroy() {}

  onSubmit(form: NgForm) {
    console.log(form.form.value);

    if (this.editMode) {
      // Edit the recipe
    } else {
      // Add the recipe
      this.recipe = new Recipe(
        form.form.value['name'],
        form.form.value['description'],
        form.form.value['imageUrl'],
        [new Ingredient('Buns', 2), new Ingredient('Meat', 1)],
      );
      this.recipeService.addRecipe(this.recipe);
      console.log(this.recipeService.getRecipes());
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
