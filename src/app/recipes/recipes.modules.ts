import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeComponent } from "./recipe-list/recipe/recipe.component";
import { RecipesHomeComponent } from "./recipes-home/recipes-home.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import * as fromRecipes from './store/recipe.reducer';

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipesComponent,
        RecipeDetailComponent,
        RecipeComponent,
        RecipesHomeComponent,
        RecipeEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        StoreModule.forFeature('recipes', fromRecipes.recipeReducer),
    ]
})
export class RecipesModule {}