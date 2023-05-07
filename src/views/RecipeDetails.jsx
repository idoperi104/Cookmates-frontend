import { useEffect, useState } from "react";
import { recipeService } from "../services/recipe.service.local";
import { useNavigate, useParams } from "react-router-dom";

export function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadRecipe();
  }, [params.id]);

  async function loadRecipe() {
    try {
      const recipe = await recipeService.getById(params.id);
      setRecipe(recipe);
    } catch (error) {
      console.log("error:", error);
    }
  }

  function onBack() {
    navigate("/recipe");
  }

  if (!recipe) return <div>Loading...</div>;

  const {
    title,
    description,
    cookTime,
    prepTime,
    imgUrl,
    ingredients,
    instructions,
    categories,
    servings,
  } = recipe;

  return (
    <section className="recipe-details">
      <img className="img-details" src={imgUrl} alt="" />

      <div className="info">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <div className="bottom-info">
          <p>cookTime: {cookTime}</p>
          <p>prepTime: {prepTime}</p>
          <p>servings: {servings}</p>
        </div>
      </div>

      <ul className="categories-list">
        {categories.map((val, idx) => (
          <li className="categories-preview" key={idx}>
            {val}
          </li>
        ))}
      </ul>
      <ul className="ingredients-list list-style">
        <h3>Ingredients:</h3>
        {ingredients.map(({ name, amount, servingSize, description }, idx) => (
          <li className="ingredients-preview" key={idx}>
            <h4 className="name">
              <span className="amount">
                {amount} {servingSize}{" "}
              </span>
              {name}
            </h4>
            <p className="description">{description}</p>
          </li>
        ))}
      </ul>
      <ul className="instructions-list list-style">
        <h3>instructions:</h3>
        {instructions.map((val, idx) => (
          <li className="instructions-preview" key={idx}>
            {val}
          </li>
        ))}
      </ul>

      {/* <button onClick={onBack}>Back</button> */}
    </section>
  );
}
