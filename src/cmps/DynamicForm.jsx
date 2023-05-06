import React, { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";

export function DynamicForm(props) {
  const { title, type, list, onSetList } = props;
  const [values, setValues] = useState(list);
  const [value, setValue] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  useEffect(() => {
    setValues(list);
  }, [list]);

  useEffect(() => {
    onSetList(type, values);
  }, [values]);

  function onAddValue(ev) {
    ev.preventDefault();
    setValues([...values, value]);
  }

  function onRemoveValue(idx) {
    console.log("idx: ", idx);
    const updateValues = values;
    updateValues.splice(idx, 1);
    setValues([...updateValues]);
  }

  function onAddIngredient(ev) {
    ev.preventDefault();
    setValues([...values, { name: ingredientName, amount: ingredientAmount }]);
    setIngredientName("");
    setIngredientAmount("");
  }

  switch (type) {
    case "categories":
    case "instructions":
      return (
        <div className="dynamic-form">
          <p>{title}</p>
          <ul>
            {values.map((val, idx) => (
              <li key={val}>
                <span>{val}</span>
                <button onClick={() => onRemoveValue(idx)}>x</button>
              </li>
            ))}
          </ul>

          <form onSubmit={onAddValue}>
            <input
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
              type="text"
            />
            <button>add</button>
          </form>
        </div>
      );
    case "ingredients":
      return (
        <div className="dynamic-form">
          <p>{title}</p>
          <ul>
            {values.map(({ name, amount }, idx) => (
              <li key={name}>
                <p>
                  {name}: <span>{amount}</span>
                </p>
                <button onClick={() => onRemoveValue(idx)}>x</button>
              </li>
            ))}
          </ul>

          <form onSubmit={onAddIngredient}>
            <input
              value={ingredientName}
              onChange={(ev) => setIngredientName(ev.target.value)}
              type="text"
              placeholder="Ingredient name"
            />
            <input
              value={ingredientAmount}
              onChange={(ev) => setIngredientAmount(ev.target.value)}
              type="text"
              placeholder="Amount"
            />
            <button>add</button>
          </form>
        </div>
      );
    default:
      return (
        <div className="dynamic-form">
          <h1>Doesn't match the type: {type}</h1>
        </div>
      );
  }
}
