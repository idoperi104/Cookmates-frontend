import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserRecipes, removeRecipe, removeUserRecipe, setFilterBy } from '../store/actions/recipe.actions'
import { UserRecipeList } from '../cmps/UserRecipeList'

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
            dispatch(removeUserRecipe(recipeId))
        } catch (error) {
            console.log('error:', error)
        }
    }, [])


    if (!recipes) return <div>Loading...</div>
    if (recipes.length === 0) return <div>there are no recipes...</div>
    return (
        <section className='recipe-index'>
            <UserRecipeList recipes={recipes} onRemoveRecipe={onRemoveRecipe} />
        </section>
    )
}
