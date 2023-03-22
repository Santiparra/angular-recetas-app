import { formatCurrency } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  constructor(private slService: ShoppingListService) {}

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
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient);
    }    
    form.reset();
    this.editMode = false
  }
  
  onReset(): void {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onReset()
  }


}
