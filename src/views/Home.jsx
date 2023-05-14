import { useSelector } from "react-redux";
import { DynamicRecipes } from "../cmps/DynamicRecipes";
import { useEffect } from "react";

export function Home() {
  return (
    <section className="home">
      <DynamicRecipes
        subTitle="top category"
        title="dinner"
        filterBy={{ categories: ["dinner"] }}
        numOfColumns="4"
      />
      <DynamicRecipes
        subTitle="are you"
        title="vegan?"
        filterBy={{ categories: ["vegan"] }}
      />
      <DynamicRecipes
        subTitle="Maybe you have searched:"
        title="'pancakes' ?"
        filterBy={{ title: "pancakes" }}
        numOfColumns="4"
      />
      <DynamicRecipes
        subTitle="Some of our favorites"
        title="tacos"
        filterBy={{ title: "tacos" }}
      />
    </section>
  );
}
