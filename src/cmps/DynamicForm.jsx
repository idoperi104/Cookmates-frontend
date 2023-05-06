import React, { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";

export function DynamicForm(props) {
  const { title, type, list, onSetList } = props;
  const [values, setValues] = useState(list);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValues(list);
  }, [list]);

  useEffect(() => {
    onSetList(type, values)
  }, [values]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    setValue(value);
  }

  function onAddValue(ev) {
    ev.preventDefault();
    console.log(value);
    setValues([...values, value])
    console.log("values: ", values);
  }

  return (
    <div className="dynamic-form">
      <p>{title}</p>
      <ul>
        {values.map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>

      <form onSubmit={onAddValue}>
        <input value={value} onChange={handleChange} type="text" />
        <button>add</button>
      </form>
    </div>
  );
}
