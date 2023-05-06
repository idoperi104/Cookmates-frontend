import { useEffect, useState } from "react";
import { recipeService } from "../services/recipe.service.local";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { DynamicForm } from "../cmps/DynamicForm";
import { CrudIngredients } from "../cmps/CrudIngredients";

export function RecipeEdit() {
  const [recipe, handleChange, setRecipe] = useForm(
    recipeService.getEmptyRecipe()
  );

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
      console.error("error:", error);
    }
  }

  function onSetList(type, list) {
    setRecipe({ ...recipe, [type]: list });
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

      <label htmlFor="imgUrl">Image Url:</label>
      <input
        value={imgUrl}
        onChange={handleChange}
        type="text"
        name="imgUrl"
        id="imgUrl"
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

      <DynamicForm
        title="categories:"
        list={categories}
        type="categories"
        onSetList={onSetList}
      />
      <DynamicForm
        title="instructions:"
        list={instructions}
        type="instructions"
        onSetList={onSetList}
      />
      <CrudIngredients
        title="ingredients:"
        list={ingredients}
        type="ingredients"
        onSetList={onSetList}
      />

      <button onClick={onSaveRecipe}>Save</button>
    </section>
  );
}
