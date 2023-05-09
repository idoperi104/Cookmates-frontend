import { memo } from "react";
import { RecipePreview } from "./RecipePreview.jsx";
function _RecipeList({ recipes, onToggleLiked, likedIds }) {
    return (
        <section className="recipe-list">
            {recipes.map(recipe =>
                <RecipePreview key={recipe._id} recipe={recipe} onToggleLiked={onToggleLiked} likedIds={likedIds}/>
            )}
        </section>
    )
}

export const RecipeList = memo(_RecipeList)
