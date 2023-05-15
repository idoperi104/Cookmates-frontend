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

      <form className={"recipe-filter flex " + getIsHiddenClass()}>
        <div className="title">
          <FontAwesomeIcon icon={faFilter} />
          <h2>Filter</h2>
        </div>

        <div className="container flex column">
          <div className="check-input">
            <input
              type="checkbox"
              id="vegan"
              name="vegan"
              value="vegan"
              // checked={checkIfChecked("categories", "vegan")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="vegan">Vegan</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="vegetarian"
              name="vegetarian"
              value="vegetarian"
              // checked={checkIfChecked("categories", "Side Dishes")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="vegetarian">Vegetarian</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="parve"
              name="parve"
              value="parve"
              // checked={checkIfChecked("categories", "Side Dishes")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="parve">Parve</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="meat"
              name="meat"
              value="meat"
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="meat">Meat</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="gluten free"
              name="gluten free"
              value="gluten free"
              // checked={checkIfChecked("categories", "Side Dishes")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="gluten free">Gluten free</label>
          </div>
        </div>

        <div className="container">
          <div className="check-input">
            <input
              type="checkbox"
              id="breakfast"
              name="breakfast"
              value="breakfast"
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="lunch"
              name="lunch"
              value="lunch"
              // checked={checkIfChecked("categories", "vegan")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="lunch">Lunch</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="dinner"
              name="dinner"
              value="dinner"
              // checked={checkIfChecked("categories", "vegan")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="dinner">Dinner</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="dessert"
              name="dessert"
              value="dessert"
              // checked={checkIfChecked("categories", "vegan")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="dessert">Dessert</label>
          </div>

          <div className="check-input">
            <input
              type="checkbox"
              id="snack"
              name="snack"
              value="snack"
              // checked={checkIfChecked("categories", "vegan")}
              onChange={(ev) => handelCheckedChange(ev, "categories")}
            />
            <label htmlFor="snack">Snack</label>
          </div>
        </div>

        <div className="container flex column">
          <div className="number-input">
            <label htmlFor="prepTime">Preparation time</label>
            <input {...register("prepTime", "number")} />
            <span>min</span>
          </div>
          <div className="number-input">
            <label htmlFor="cookTime">Cooking time</label>
            <input {...register("cookTime", "number")} />
            <span>min</span>
          </div>
        </div>
      </form>
    </>
  );
}

export const RecipeFilter = memo(_RecipeFilter);
