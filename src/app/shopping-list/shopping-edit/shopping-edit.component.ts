import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) {}

  @ViewChild("form") slForm: NgForm;
  editionSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.editionSubscription = this.slService.editionStarted
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
    this.editionSubscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const values = form.value;
    const newIngredient = new Ingredient(
     values.name,
     values.amount
    );
    if (this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredients({
        index: this.editedItemIndex,
        ingredient: newIngredient
      }))
    } else {
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }    
    form.reset();
    this.editMode = false
  }
  
  onReset(): void {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(this.editedItemIndex));
    this.onReset()
  }


}
