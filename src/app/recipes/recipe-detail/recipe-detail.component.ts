import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  recipe: Recipe;
  id: number;
  
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => { 
          this.id = +params["id"];
          this.recipe = this.recipeService.getRecipe(this.id)
        }
      )
  }

  onAddToSL() {
    this.recipeService.addIngredientToSL(this.recipe.ingredients)
  }

  onEditRecipe() {
    //this.router.navigate(["edit"], {relativeTo: this.route})
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

}
