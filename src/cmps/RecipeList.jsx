import { memo } from "react";
import { RecipePreview } from "./RecipePreview.jsx";
function _RecipeList({ recipes, onToggleLike, likedIds }) {
    return (
        <section className="recipe-list">
            {recipes.map(recipe =>
                <RecipePreview key={recipe._id} recipe={recipe} onToggleLike={onToggleLike} likedIds={likedIds}/>
            )}
        </section>
    )
}

export const RecipeList = memo(_RecipeList)
