import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadRecipes, removeRecipe, setFilterBy } from '../store/actions/recipe.actions'
import { RecipeList } from '../cmps/RecipeList'
import { recipeService } from '../services/recipe.service.local'


export function RecipeIndex() {
    const recipes = useSelector((storeState) => storeState.recipeModule.recipes)
    const filterBy = useSelector((storeState) => storeState.recipeModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilterBy(recipeService.getEmptyFilterBy()))
        dispatch(loadRecipes())
    }, [])

    const onRemoveRecipe = useCallback(async (recipeId) => {
        try {
            dispatch(removeRecipe(recipeId))
        } catch (error) {
            console.log('error:', error)
        }
    }, [])

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadRecipes())
    }



    if (!recipes) return <div>Loading...</div>
    return (
        <section className='recipe-index'>
            {/* <pre>{JSON.stringify(recipes, null, 2)}</pre> */}
            {/* <RecipeFilter filterBy={filterBy} onChangeFilter={onChangeFilter} /> */}
            <RecipeList recipes={recipes} onRemoveRecipe={onRemoveRecipe} />
        </section>
    )
}