import React, { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";
import { recipeService } from "../services/recipe.service.local";

export function CrudIngredients(props) {
  const { title, type, list, onSetList } = props;
  const [ingredients, setIngredients] = useState(list);
  const [ingredient, handleChange, setIngredient] = useForm(
    recipeService.getEmptyIngredient()
  );

  useEffect(() => {
    setIngredients(list);
  }, [list]);

  useEffect(() => {
    onSetList(type, ingredients);
  }, [ingredients]);

  function onAddIngredient(ev) {
    ev.preventDefault();
    setIngredients([...ingredients, { ...ingredient }]);
  }

  function onRemoveIngredient(idx) {
    const updateIngredients = ingredients;
    updateIngredients.splice(idx, 1);
    setIngredients([...updateIngredients]);
  }

  const { name, amount, servingSize, description } = ingredient;

  return (
    <div className="crud-obj">
      <h3>crud-obj</h3>
      <h3>{title}</h3>
      <ul>
        {ingredients.map((val, idx) => {
          return (
            <li key={idx}>
              <p>
                {val.name}: {val.amount}
              </p>
              <button onClick={() => onRemoveIngredient(idx)}>x</button>
            </li>
          );
        })}
      </ul>

      <form onSubmit={onAddIngredient}>
        <label htmlFor="name">name:</label>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
        />

        <label htmlFor="amount">amount:</label>
        <input
          value={amount}
          onChange={handleChange}
          type="number"
          name="amount"
          id="amount"
        />

        <label htmlFor="amount">servingSize:</label>
        <select
          value={servingSize}
          onChange={handleChange}
          name="servingSize"
          id="servingSize"
        >
          <option disabled value="">
            Choose a serving size
          </option>
          <option value="cup">Cup</option>
          <option value="spoon">Spoon</option>
          <option value="grams">Grams</option>
          <option value="ml">Ml</option>
        </select>

        <label htmlFor="amount">description:</label>
        <input
          value={description}
          onChange={handleChange}
          type="text"
          name="description"
          id="description"
        />
        <button>add</button>
      </form>
    </div>
  );
}
