import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DbService } from "../shared/db.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipesResolverService {

    constructor(private dbService: DbService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.dbService.getRecipes()
    }

}