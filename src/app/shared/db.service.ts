import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({ providedIn: "root" })
export class DbService {
    
    constructor(
        private http: HttpClient,
        private recipeService: RecipesService,
        private authService: AuthService,
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

    getRecipes() {
        return this.http.get<Recipe[]>(
            "https://angular-recetas-app-default-rtdb.firebaseio.com/recipes.json"
        )
        .pipe(                            
            map(recipes => {
                return recipes.map(recipe => {
                    return { 
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )        
    }

}
