import { Component } from '@angular/core';
import { DbService } from '../shared/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dbService: DbService) {}
 
  onSaveData() {
   this.dbService.storeRecipes();
  }

  onLoadData() {
    this.dbService.getRecipes();
  }

}
