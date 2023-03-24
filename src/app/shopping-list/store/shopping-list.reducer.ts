import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


const initialState = {
    ingredients: [
        new Ingredient("Manzanas", 5),
        new Ingredient("Tomates", 7),
    ]
}

export function shoppingListReducer(
    state = initialState,  
    action: ShoppingListActions.ShoppingListActions
    ) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS: 
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const newIngredient = { ...ingredient, ...action.payload.ingredient };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = newIngredient;
            return {
                ...state,
                ingredients: updatedIngredients
            };   
        case ShoppingListActions.DELETE_INGREDIENT:            
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
                    return ingredientIndex !== action.payload
                })
            };         
        default: 
            return state     
    }
}