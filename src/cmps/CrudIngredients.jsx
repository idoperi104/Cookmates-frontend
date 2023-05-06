import React, { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";

export function CrudIngredients(props) {
  const { title, type, list, onSetList } = props;
  const [ingredients, setIngredients] = useState(list);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setIngredients(list);
  }, [list]);

  useEffect(() => {
    onSetList(type, ingredients);
  }, [ingredients]);

  function onAddIngredient(ev) {
    ev.preventDefault();
    setIngredients([...ingredients ,{ name, amount }]);
  }

  function onRemoveIngredient(idx) {
    const updateIngredients = ingredients;
    updateIngredients.splice(idx, 1);
    setIngredients([...updateIngredients]);
  }

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
          onChange={(ev) => setName(ev.target.value)}
          type="text"
          name="name"
          id="name"
        />
        <label htmlFor="amount">amount:</label>
        <input
          value={amount}
          onChange={(ev) => setAmount(ev.target.value)}
          type="text"
          name="amount"
          id="amount"
        />
        <button>add</button>
      </form>
    </div>
  );
}
