import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit{

  constructor(private recipeService: RecipesService) {}
    
  selectedRecipe: Recipe;

  ngOnInit(): void {
    this.recipeService.selectedRecipe
      .subscribe( (recipe: Recipe) => {
        this.selectedRecipe = recipe
      }
      )
  }
  
}
