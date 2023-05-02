import { memo } from "react";
import { RecipePreview } from "./RecipePreview.jsx";
function _RecipeList({ recipes, onRemoveRecipe }) {
    return (
        <section className="recipe-list">
            {recipes.map(recipe =>
                <RecipePreview key={recipe._id} recipe={recipe} onRemoveRecipe={onRemoveRecipe} />
            )}
        </section>
    )
}

export const RecipeList = memo(_RecipeList)
