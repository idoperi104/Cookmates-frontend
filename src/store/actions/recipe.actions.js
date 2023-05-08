import { recipeService } from "../../services/recipe.service.local"
import { REMOVE_RECIPE, SET_FILTER_BY, SET_RECIPES, SET_USER_RECIPES } from "../reducers/recipe.reducer"

export function loadRecipes() {
    return async (dispatch, getState) => {
        try {
            const recipes = await recipeService.query(getState().recipeModule.filterBy)
            const action = {
                type: SET_RECIPES,
                recipes
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function loadUserRecipes() {
    return async (dispatch, getState) => {
        try {
            const recipes = await recipeService.query(getState().recipeModule.filterBy)
            const action = {
                type: SET_USER_RECIPES,
                recipes
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeRecipe(recipeId) {
    return async (dispatch) => {
        try {
            await recipeService.remove(recipeId)
            const action = { type: REMOVE_RECIPE, recipeId }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}