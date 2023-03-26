import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import * as fromShoppingList from './store/shopping-list.reducer';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([{path: "", component: ShoppingListComponent}]),
        StoreModule.forFeature('shoppingList', fromShoppingList.shoppingListReducer)
    ]
})
export class ShoppingListModule {}