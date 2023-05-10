import { useSelector } from "react-redux";
import { DynamicRecipes } from "../cmps/DynamicRecipes";
import { useEffect } from "react";

export function Home() {
  return (
    <section className="home">
      <h1>Welcome to Cookmates!</h1>
      <DynamicRecipes
        title="Recipes with garlic:"
        filterBy={{ title: "garlic" }}
      />
      <DynamicRecipes
        title="Maybe you have searched: 'spa' ?"
        filterBy={{ title: "spa" }}
      />
    </section>
  );
}
