import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadRecipes, loadUserRecipes, removeRecipe, setFilterBy } from '../store/actions/recipe.actions'
import { RecipeList } from '../cmps/RecipeList'

export function UserRecipes({userId}) {
    // console.log("userId: ", userId);
    const recipes = useSelector((storeState) => storeState.recipeModule.userRecipes)
    const filterBy = useSelector((storeState) => storeState.recipeModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilterBy({userId}))
        dispatch(loadUserRecipes())
    }, [])

    const onRemoveRecipe = useCallback(async (recipeId) => {
        try {
            dispatch(removeRecipe(recipeId))
        } catch (error) {
            console.log('error:', error)
        }
    }, [])




    if (!recipes) return <div>Loading...</div>
    return (
        <section className='recipe-index'>
            {/* <RecipeFilter filterBy={filterBy} onChangeFilter={onChangeFilter} /> */}
            <RecipeList recipes={recipes} onRemoveRecipe={onRemoveRecipe} />
        </section>
    )
}
