import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  constructor(private recipeService: RecipesService) {}

  @Input() recipe: Recipe;

  onAddToSL() {
    this.recipeService.addIngredientToSL(this.recipe.ingredients)
  }
}
