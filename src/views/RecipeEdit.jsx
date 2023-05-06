import { useEffect, useState } from "react";
import { recipeService } from "../services/recipe.service.local";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { DynamicForm } from "../cmps/DynamicForm";

export function RecipeEdit() {
  const [recipe, handleChange, setRecipe] = useForm(
    recipeService.getEmptyRecipe()
  );

  const [category, setCategory] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadRecipe();
  }, []);

  async function loadRecipe() {
    const recipeId = params.id;
    if (recipeId) {
      try {
        const recipe = await recipeService.getById(recipeId);
        setRecipe(recipe);
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  async function onSaveRecipe(ev) {
    ev.preventDefault();
    try {
      await recipeService.save({ ...recipe });
      navigate("/recipe");
    } catch (error) {
      console.log("error:", error);
    }
  }

  function onSetList(type, list) {
    setRecipe({...recipe, [type]: list})
  }

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
    <section className="recipe-edit">
      <h2>{recipe._id ? "Edit" : "Add"} Recipe</h2>
      <form className="form-edit" onSubmit={onSaveRecipe}>
        <label htmlFor="title">title:</label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="description">Description:</label>
        <input
          value={description}
          onChange={handleChange}
          type="text"
          name="description"
          id="description"
        />

        <label htmlFor="cookTime">cookTime:</label>
        <input
          value={cookTime}
          onChange={handleChange}
          type="number"
          name="cookTime"
          id="cookTime"
        />

        <label htmlFor="prepTime">prepTime:</label>
        <input
          value={prepTime}
          onChange={handleChange}
          type="number"
          name="prepTime"
          id="prepTime"
        />

        <label htmlFor="servings">servings:</label>
        <input
          value={servings}
          onChange={handleChange}
          type="number"
          name="servings"
          id="servings"
        />

        <button>Save</button>
      </form>

      <DynamicForm title="categories:" list={categories} type="categories" onSetList={onSetList} />
      <DynamicForm title="instructions:" list={instructions} type="instructions" onSetList={onSetList} />

      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </section>
  );
}
