import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(null, [Validators.min(1), Validators.required]),
  });
  editMode = false;
  editedItemIndex: number | undefined;

  subscription: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        const ingredient = this.slService.getIngredient(index);
        this.shoppingForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.shoppingForm.value.name,
      this.shoppingForm.value.amount,
    );

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.shoppingForm.reset(); // Reset the form
    this.editMode = false; // Reset the edit mode
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
