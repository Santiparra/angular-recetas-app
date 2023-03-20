import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(arg0: string) {
   this.featureSelected.emit(arg0);
  }

}
