import React, { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";

export function CrudList(props) {
  const { title, type, list, onSetList, labelName } = props;
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

  return (
    <div className="crud-list">
      <p>{title}:</p>
      <ul className="crud-list-list list-style">
        {values.map((val, idx) => (
          <li className="crud-list-preview" key={val}>
            <button className="btn-remove" onClick={() => onRemoveValue(idx)}>x</button>
            <p className="val">{val}</p>
          </li>
        ))}
      </ul>

      <form className="form-style" onSubmit={onAddValue}>
        <label htmlFor="value">add a new {labelName}:</label>
        <input
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          type="text"
          name={labelName}
          id={labelName}
        />
        <button>add</button>
      </form>
    </div>
  );
}
