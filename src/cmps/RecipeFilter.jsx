import React, { Component, memo, useEffect, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useForm } from "../customHooks/useForm";
import { useFormRegister } from "../customHooks/useFormRegister";

function _RecipeFilter({ filterBy, onChangeFilter }) {

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

  return (
    <form className="recipe-filter">

      <input
        type="checkbox"
        id="Pasta"
        name="Pasta"
        value={"Pasta"}
        onChange={(ev) => handelCheckedChange(ev, "categories")}
      />
      <label htmlFor="Pasta">Pasta</label>
      <input
        type="checkbox"
        id="Side Dishes"
        name="Side Dishes"
        value={"Side Dishes"}
        onChange={(ev) => handelCheckedChange(ev, "categories")}
      />
      <label htmlFor="Side Dishes">Side Dishes</label>
    </form>
  );
}

export const RecipeFilter = memo(_RecipeFilter);
