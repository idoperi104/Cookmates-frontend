import { memo } from "react";
import { UserRecipePreview } from "./UserRecipePreview.jsx";
function _UserRecipeList({ recipes, onRemoveRecipe }) {
    return (
        <section className="user-recipe-list">
            {recipes.map(recipe =>
                <UserRecipePreview key={recipe._id} recipe={recipe} onRemoveRecipe={onRemoveRecipe} />
            )}
        </section>
    )
}

export const UserRecipeList = memo(_UserRecipeList)
