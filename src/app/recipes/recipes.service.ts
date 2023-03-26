import { Injectable} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer';


@Injectable()
export class RecipesService {
        
    constructor(
        private store: Store<fromApp.AppState>
        ) {}

    recipeChanges = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
   
    //el slice es para devolver una copia y no se pueda modificar el original
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientToSL(ingredients: Ingredient[]): void {
        this.store.dispatch(ShoppingListActions.addIngredients({ingredients}))
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipeChanges.next(this.recipes.slice())
    }
        
    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe
        this.recipeChanges.next(this.recipes.slice())
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipeChanges.next(this.recipes.slice())
    }

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipeChanges.next(this.recipes.slice())
    }

}
