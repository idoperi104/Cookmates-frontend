import { useEffect, useRef } from "react";
import { recipeService } from "../services/recipe.service.local";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { CrudList } from "../cmps/CrudList";
import { CrudIngredients } from "../cmps/CrudIngredients";
import { uploadService } from "../services/upload.service";

export function RecipeEdit() {
  const [recipe, handleChange, setRecipe] = useForm(
    recipeService.getEmptyRecipe()
  );

  const params = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

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

  async function handleFile({ target }) {
    const imgUrl = await uploadService.uploadImg(target.files[0]);
    setRecipe({ ...recipe, imgUrl });
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
      <form className="form-style">
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
        <div className="img-uploader">
          <img src={imgUrl || "../assets/imgs/drag.png"} alt="" />
          <input
            className="input-img"
            onChange={handleFile}
            ref={fileInputRef}
            accept="image/*"
            type="file"
          />
        </div>
        <button onClick={() => fileInputRef.current.click()}>
          Upload an image
        </button>

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
      </form>

      <CrudList
        title="categories"
        list={categories}
        type="categories"
        onSetList={onSetList}
        labelName="category"
      />
      <CrudList
        title="Instructions"
        list={instructions}
        type="instructions"
        onSetList={onSetList}
        labelName="instruction"
      />
      <CrudIngredients
        title="ingredients:"
        list={ingredients}
        type="ingredients"
        onSetList={onSetList}
        labelName="ingredient"
      />

      <button onClick={onSaveRecipe}>Save</button>
    </section>
  );
}
