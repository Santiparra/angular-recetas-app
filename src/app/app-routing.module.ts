import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipes/recipe-list/recipe/recipe.component';
import { RecipesHomeComponent } from './recipes/recipes-home/recipes-home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {path: "recipes", component: RecipesComponent, 
   canActivate: [AuthGuard],
   children: [
    {path: "", component: RecipesHomeComponent},
    {path: "new", component: RecipeEditComponent},
    {path: ":id", component: RecipeDetailComponent},    
    {path: ":id/edit", component: RecipeEditComponent},
    
  ]},
  {path: "shopping-list", component: ShoppingListComponent},
  {path: "auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
