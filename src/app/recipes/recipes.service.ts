import { Injectable} from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";


@Injectable()
export class RecipesService {
        
    constructor(
        private slService: ShoppingListService,
        private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
        ) {}

    recipeChanges = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
   /*  private recipes: Recipe[] = [
        new Recipe(
            "Hamburguesa",
            "Una hamburguesa de carne",
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80",
            [
                new Ingredient("Carne", 1),
                new Ingredient("Pan", 2)
            ]
        ),
        new Recipe(
            "Tallarines",
            "A secas porque somos pobres",
            "https://images.unsplash.com/photo-1600490036275-35f5f1656861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", 
            [
                new Ingredient("Fideos", 1)
            ]
        )
    ];  */  

    //el slice es para devolver una copia y no se pueda modificar el original
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientToSL(ingredients: Ingredient[]): void {
        //this.slService.addIngredients(ingredients)
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
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
