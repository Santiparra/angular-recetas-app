import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>    
    ) {}
    
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private idChangesSub: Subscription;

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
    /* this.ingredients = this.slService.getIngredients();
    this.idChangesSub = this.slService.ingredientChanged
      .subscribe( (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
        }
      ) */
  }

  ngOnDestroy(): void {
    /* this.idChangesSub.unsubscribe(); */
  }

  onEditItem(index: number) {
    this.slService.editionStarted.next(index);
  }
   
}
