import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({ providedIn: "root" })
export class DbService {
    
    constructor(
        private http: HttpClient,
        private recipeService: RecipesService,
    ) { }

    storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            "https://angular-recetas-app-default-rtdb.firebaseio.com/recipes.json",
            recipes
        )
        .subscribe(
            response => {
                console.log(response)
        })
    }

    getRecipes(): void {
        this.http.get<Recipe[]>(
            "https://angular-recetas-app-default-rtdb.firebaseio.com/recipes.json"
        )
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return { 
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            })
        }))
        .subscribe (
            recipes => {
                this.recipeService.setRecipes(recipes)
            }
        )
    }

}
