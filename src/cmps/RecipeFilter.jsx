import React, { Component, memo, useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useForm } from "../customHooks/useForm";
import { useFormRegister } from "../customHooks/useFormRegister";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";

function _RecipeFilter({ filterBy, onChangeFilter }) {
  const [register] = useFormRegister({ ...filterBy }, onChangeFilter);
  const [isHidden, setIsHidden] = useState(true);

  const handelCheckedChange = ({ target }, key) => {
    const { value, checked } = target;
    const values = [...filterBy[key]];
    if (checked) {
      values.push(value);
    } else {
      const idx = values.findIndex((val) => val === value);
      values.splice(idx, 1);
    }
    onChangeFilter({ ...filterBy, [key]: values });
  };

  const onToggleFilter = () => {
    setIsHidden((prevIsHidden) => !prevIsHidden);
  };

  const getIsHiddenClass = () => {
    return isHidden ? "is-hidden" : "";
  };

  // const checkIfChecked = (key, val) => {
  //   return filterBy[key].includes(val)
  // };

  return (
    <>
      <button className="btn-toggle-filter" onClick={onToggleFilter}>
        {/* <FontAwesomeIcon icon={faBars} /> */}
        <FontAwesomeIcon icon={faFilter} />
      </button>
      <form className={"recipe-filter " + getIsHiddenClass()}>
        <div className="container">
          <label htmlFor="prepTime">prepTime</label>
          <input {...register("prepTime", "number")} />

          <label htmlFor="cookTime">cookTime</label>
          <input {...register("cookTime", "number")} />
        </div>

        <div className="container">
          <div className="check-input">
            <input
              type="checkbox"
              id="Pasta"
              name="Pasta"
              value={"Pasta"}
              // checked={checkIfChecked("categories", "Pasta")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="Pasta">Pasta</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="Side Dishes"
              name="Side Dishes"
              value={"Side Dishes"}
              // checked={checkIfChecked("categories", "Side Dishes")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="Side Dishes">Side Dishes</label>
          </div>
        </div>
        <div className="container">
          <div className="check-input">
            <input
              type="checkbox"
              id="Pasta"
              name="Pasta"
              value={"Pasta"}
              // checked={checkIfChecked("categories", "Pasta")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="Pasta">Pasta</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="Side Dishes"
              name="Side Dishes"
              value={"Side Dishes"}
              // checked={checkIfChecked("categories", "Side Dishes")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="Side Dishes">Side Dishes</label>
          </div>
        </div>
      </form>
    </>
  );
}

export const RecipeFilter = memo(_RecipeFilter);
