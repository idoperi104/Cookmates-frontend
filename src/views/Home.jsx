import { useSelector } from "react-redux";
import { DynamicRecipes } from "../cmps/DynamicRecipes";
import { useEffect } from "react";

export function Home() {
  return (
    <section className="home">
      <DynamicRecipes
        subTitle="top category"
        title="meat"
        filterBy={{ categories: ["Meat"] }}
        numOfColumns="4"
      />
      <DynamicRecipes
        subTitle="are you"
        title="italian?"
        filterBy={{ categories: ["Italian"] }}
      />
      <DynamicRecipes
        subTitle="Maybe you have searched:"
        title="'spaghetti' ?"
        filterBy={{ title: "spa" }}
        numOfColumns="4"
      />
      <DynamicRecipes
        subTitle="Some of our favorites"
        title="Recipes with garlic"
        filterBy={{ title: "garlic" }}
      />
    </section>
  );
}
