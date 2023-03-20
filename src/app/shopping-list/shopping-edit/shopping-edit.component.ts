import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild("nameInput") nameInputRef: ElementRef;
  @ViewChild("amountInput") amountInputRef: ElementRef;

  @Output() ingredientAdd = new EventEmitter<Ingredient>();

  addIngredient() {
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value, 
      this.amountInputRef.nativeElement.value
    );
    this.ingredientAdd.emit(newIngredient);
  }

}
