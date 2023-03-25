import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../shared/db.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
    private store: Store<fromApp.AppState>,
    private dbService: DbService,
    private authService: AuthService,
  ) {}
  
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
   this.dbService.storeRecipes();
  }

  onLoadData(): void {
    this.dbService.getRecipes().subscribe();
  }

  onLogOut(): void {
    this.authService.logOut();
  }

}
