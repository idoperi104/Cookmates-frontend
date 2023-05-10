import React, { Component, memo, useEffect, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useForm } from "../customHooks/useForm";
import { useFormRegister } from "../customHooks/useFormRegister";

export function _SearchBar({ filterBy, onChangeFilter }) {
  console.log("render");
  console.log("filterBy: ", filterBy);
  const [register] = useFormRegister({ ...filterBy }, onChangeFilter);

  

  return (
    <form className="search-bar">
      {/* <label htmlFor="title">Model</label> */}
      <input
        className="input-search"
        placeholder="Search"
        {...register("title", "text")}
      />
    </form>
  );
}

export const SearchBar = memo(_SearchBar);
