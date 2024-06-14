import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient-model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    imagePath: new FormControl(null, Validators.required),
    ingredients: new FormArray([]),
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.name = params['name'];
      this.editMode = params['name'] != null;
    });

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.name);

      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          (this.editForm.get('ingredients') as FormArray).push(
            this.initIngredientForm(ingredient),
          );
        }
      }

      this.editForm.patchValue({
        name: this.recipe.name,
        description: this.recipe.description,
        imagePath: this.recipe.imagePath,
      });
    }
  }

  initIngredientForm(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  onAddIngredient() {
    (this.editForm.get('ingredients') as FormArray).push(
      this.initIngredientForm({ name: '', amount: 1 }),
    );
  }

  onRemoveIngredient(index: number) {
    (this.editForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy() {}

  onSubmit() {
    const newRecipe = new Recipe(
      this.editForm.value['name'],
      this.editForm.value['description'],
      this.editForm.value['imagePath'],
      this.editForm.value['ingredients'],
    );

    if (this.editMode) {
      // Edit the recipe
      this.recipeService.updateRecipe(this.name, newRecipe);
      this.router.navigate([`/recipes/${newRecipe.name}`], {
        relativeTo: this.route,
      });
    } else {
      // Add the recipe
      this.recipeService.addRecipe(newRecipe);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe.name);
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  // Getter
  get ingredientsControls() {
    return (this.editForm.get('ingredients') as FormArray).controls;
  }

  onClearIngredients() {
    (this.editForm.get('ingredients') as FormArray).clear();
  }
}
