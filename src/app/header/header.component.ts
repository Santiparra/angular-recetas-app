import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(private store: Store<fromApp.AppState>) {}
  
  userSubscription: Subscription;
  isAuthenticated = false;

  ngOnInit(): void {
    this.userSubscription = this.store.select("auth")
    .pipe( map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user
        //lo mismo que:
        //this.isAuthenticated = !user ? false : true
      })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
 
  onSaveData(): void {
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  onLoadData(): void {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  onLogOut(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
