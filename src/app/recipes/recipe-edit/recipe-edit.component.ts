import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient-model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

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

  editForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    imagePath: new FormControl(null),
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.name = params['name'];
      this.editMode = params['name'] != null;
    });

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.name);
      this.editForm.setValue({
        name: this.recipe.name,
        description: this.recipe.description,
        imagePath: this.recipe.imagePath,
      });
    }
  }

  ngOnDestroy() {}

  onSubmit() {
    const newRecipe = new Recipe(
      this.editForm.value['name'],
      this.editForm.value['description'],
      this.editForm.value['imagePath'],
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)],
    );

    if (this.editMode) {
      // Edit the recipe
      this.recipeService.updateRecipe(this.name, newRecipe);
      console.log(this.recipeService.getRecipes());
      this.router.navigate([`/recipes/${newRecipe.name}`], {
        relativeTo: this.route,
      });
    } else {
      // Add the recipe
      this.recipeService.addRecipe(this.recipe);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
