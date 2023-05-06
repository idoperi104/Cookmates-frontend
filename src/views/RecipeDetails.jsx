import { useEffect, useState } from 'react'
import { recipeService } from '../services/recipe.service.local'
import { useNavigate, useParams } from 'react-router-dom'

export function RecipeDetails() {
    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadRecipe()
    }, [params.id])

    async function loadRecipe() {
        try {
            const recipe = await recipeService.getById(params.id)
            setRecipe(recipe)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onBack() {
        navigate('/recipe')
    }

    if (!recipe) return <div>Loading...</div>
    return (
        <section className='recipe-details'>
            <button onClick={onBack}>Back</button>
            <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </section>
    )
}
