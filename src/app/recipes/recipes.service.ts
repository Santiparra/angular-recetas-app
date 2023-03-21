import { EventEmitter, Injectable, Output } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
    
    constructor(private slService: ShoppingListService) {}

    private recipes: Recipe[] = [
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
    ];
    
    @Output() selectedRecipe = new EventEmitter<Recipe>(); 

    //el slice es para devolver una copia y no se pueda modificar el original
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientToSL(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }
    
}