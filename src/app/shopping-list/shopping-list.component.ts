import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  constructor(
    private store: Store<fromApp.AppState>    
    ) {}
    
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private idChangesSub: Subscription;

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
  }

  ngOnDestroy(): void {

  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
   
}
