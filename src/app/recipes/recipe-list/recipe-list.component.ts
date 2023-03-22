import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute  
  ) {}

  recipesChangesSubscription: Subscription;  
  recipes: Recipe[];

  ngOnInit(): void {
    this.recipesChangesSubscription = this.recipeService.recipeChanges
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes
        }
      )
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesChangesSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

}
