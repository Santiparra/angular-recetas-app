import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {


  ingredients: Ingredient[] = [
    new Ingredient("Manzanas", 5),
    new Ingredient("Tomates", 7),
  ];

  addIngredient(name: string, amount: number) {
    
  }
  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
