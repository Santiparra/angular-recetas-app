import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor( 
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    if(isPlatformBrowser(PLATFORM_ID)) {
      this.store.dispatch(AuthActions.autoLogin())
    }
  }  

}
