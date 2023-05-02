import React from 'react'
import { Link } from 'react-router-dom'

export function RecipePreview({ recipe, onRemoveRecipe }) {

    return (
        <article className='recipe-preview'>
            <Link to={`/recipe/${recipe._id}`} className="info">
                <h2>{recipe.title}</h2>
                <h4>time: {recipe.totalTime}</h4>
                <h4>servings: {recipe.servings}</h4>
            </Link>
            <section className="actions">
                <button onClick={() => onRemoveRecipe(recipe._id)} >X</button>
                <Link to={`/recipe/edit/${recipe._id}`}>Edit</Link>
            </section>
        </article>
    )
}
