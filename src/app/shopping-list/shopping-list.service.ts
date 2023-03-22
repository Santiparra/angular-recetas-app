import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
        
    ingredientChanged = new Subject<Ingredient[]>()
    editionStarted = new Subject<number>()

    private ingredients: Ingredient[] = [
        new Ingredient("Manzanas", 5),
        new Ingredient("Tomates", 7),
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice()
    }
    
    getIngredient(index: number): Ingredient {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice())
    }

}
