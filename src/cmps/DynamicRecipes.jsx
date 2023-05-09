import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recipeService } from "../services/recipe.service.local";

export function DynamicRecipes({ filterBy }) {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);
  
  const fetchRecipes = async () => {
    const recipes = await recipeService.query(filterBy);
    setRecipes(recipes);
  };

  if (!recipes) return <div>Loading...</div>;
  if (recipes.length === 0) return <div>there are no liked recipes...</div>;
  return (
    <section className="dynamic-recipes">
      <section className="recipe-list">
        {recipes.map((recipe) => (
          <article key={recipe._id} className="recipe-preview">
            <Link to={`/recipe/${recipe._id}`} className="info">
              <img src={recipe.imgUrl} alt="" />
              <h3 className="title">{recipe.title}</h3>
              <h4 className="description">{recipe.description}</h4>
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
}
