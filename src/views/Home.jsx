import { DynamicRecipes } from "../cmps/DynamicRecipes";

export function Home() {
  return (
    <section className="home">
      <h1>Welcome to Cookmates!</h1>
      <DynamicRecipes filterBy={{ title: "garlic" }} />
    </section>
  );
}
