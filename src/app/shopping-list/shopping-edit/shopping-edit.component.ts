import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  constructor(
    private store: Store<fromApp.AppState>
    ) {}

  @ViewChild("form") slForm: NgForm;
  editionSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.editionSubscription = this.store
      .select("shoppingList")
      .subscribe(stateData => {
        const index = stateData.editIndex;
        if (index > -1) {
          this.editMode = true;
          this.editedItem = stateData.ingredients[index];
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.editionSubscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit())
  }

  onSubmit(form: NgForm): void {
    const values = form.value;
    const newIngredient = new Ingredient(
     values.name,
     values.amount
    );
    if (this.editMode) {
      this.store.dispatch(
        ShoppingListActions.updateIngredient({ingredient: newIngredient})
      )
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({ingredient: newIngredient})
      )
    }    
    form.reset();
    this.editMode = false
  }
  
  onReset(): void {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit())
  }

  onDelete(): void {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onReset()
  }

}
