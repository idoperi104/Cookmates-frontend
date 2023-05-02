import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = "recipe";

export const recipeService = {
  query,
  getById,
  save,
  remove,
  getEmptyRecipe,
  postRecipes
};
window.rs = recipeService;

async function query(filterBy = { title: "" }) {
  var recipes = await storageService.query(STORAGE_KEY);
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    recipes = recipes.filter(
      (recipe) => regex.test(recipe.vendor) || regex.test(recipe.description)
    );
  }
  return recipes;
}

function getById(recipeId) {
  return storageService.get(STORAGE_KEY, recipeId);
}

async function remove(recipeId) {
  await storageService.remove(STORAGE_KEY, recipeId);
}

async function save(recipe) {
  var savedRecipe;
  if (recipe._id) {
    savedRecipe = await storageService.put(STORAGE_KEY, recipe);
  } else {
    savedRecipe = await storageService.post(STORAGE_KEY, recipe);
  }
  return savedRecipe;
}

function getEmptyRecipe() {
  return {
    title: "",
    description: "",
    imgUrl: "",
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    ingredients: [],
    instructions: [],
    categories: [],
  };
}

// TEST DATA
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
// })()

async function postRecipes() {
  const recipes = [
    {
      title: "Classic Margherita Pizza",
      description:
        "A traditional Neapolitan pizza topped with San Marzano tomatoes, fresh mozzarella cheese, and basil leaves.",
      image: "https://www.example.com/images/margherita-pizza.jpg",
      prepTime: 20,
      cookTime: 15,
      totalTime: 35,
      servings: 4,
      ingredients: [
        { name: "pizza dough", amount: "1 pound" },
        { name: "San Marzano tomatoes", amount: "1 can (28 oz)" },
        { name: "fresh mozzarella cheese", amount: "8 oz" },
        { name: "fresh basil leaves", amount: "1/4 cup" },
        { name: "olive oil", amount: "1 tablespoon" },
        { name: "salt", amount: "1/2 teaspoon" },
        { name: "black pepper", amount: "1/2 teaspoon" },
      ],
      instructions: [
        "Preheat oven to 500°F.",
        "Stretch pizza dough to desired size and shape on a lightly floured surface.",
        "Spread San Marzano tomatoes over the pizza dough, leaving a 1/2-inch border around the edges.",
        "Tear fresh mozzarella cheese into small pieces and distribute over the tomatoes.",
        "Drizzle olive oil over the pizza and sprinkle with salt and black pepper.",
        "Bake for 12-15 minutes, or until the crust is golden brown and the cheese is melted and bubbly.",
        "Remove from oven and sprinkle with fresh basil leaves.",
        "Slice and serve hot.",
      ],
      categories: ["pizza", "italian"],
    },
    {
      title: "Thai Green Curry",
      description:
        "A spicy and fragrant Thai curry made with green curry paste, coconut milk, and fresh herbs.",
      image: "https://www.example.com/images/thai-green-curry.jpg",
      prepTime: 15,
      cookTime: 30,
      totalTime: 45,
      servings: 4,
      ingredients: [
        {
          name: "boneless, skinless chicken thighs",
          amount: "1 lb, cut into bite-sized pieces",
        },
        { name: "green curry paste", amount: "3 tablespoons" },
        { name: "coconut milk", amount: "1 can (13.5 oz)" },
        { name: "chicken broth", amount: "1 cup" },
        { name: "green beans", amount: "1 cup, trimmed" },
        { name: "red bell pepper", amount: "1, sliced" },
        { name: "bamboo shoots", amount: "1/2 cup, drained" },
        { name: "fish sauce", amount: "2 tablespoons" },
        { name: "brown sugar", amount: "1 tablespoon" },
        { name: "lime juice", amount: "1 tablespoon" },
        { name: "fresh basil leaves", amount: "1/4 cup, chopped" },
        { name: "fresh cilantro leaves", amount: "1/4 cup, chopped" },
      ],
      instructions: [
        "In a large pot or Dutch oven, heat some oil over medium-high heat.",
        "Add the chicken and cook until browned on all sides.",
        "Add the green curry paste and cook for 1-2 minutes, stirring constantly.",
        "Add the coconut milk and chicken broth, and stir to combine.",
        "Add the green beans, red bell pepper, and bamboo shoots, and bring to a simmer.",
        "Reduce the heat to medium-low and simmer for 15-20 minutes, or until the chicken is cooked through and the vegetables are tender.",
        "Stir in the fish sauce, brown sugar, and lime juice.",
        "Remove from heat and stir in the chopped basil and cilantro.",
        "Serve over rice or noodles.",
      ],
      categories: ["curry", "thai", "spicy"],
    },
    {
      title: "Roasted Vegetable Salad",
      description:
        "A colorful and healthy salad made with roasted vegetables, quinoa, and a lemon-herb vinaigrette.",
      image: "https://www.example.com/images/roasted-vegetable-salad.jpg",
      prepTime: 20,
      cookTime: 30,
      totalTime: 50,
      servings: 4,
      ingredients: [
        { name: "red onion", amount: "1/2, sliced" },
        { name: "red bell pepper", amount: "1, sliced" },
        { name: "yellow bell pepper", amount: "1, sliced" },
        { name: "zucchini", amount: "1, sliced" },
        { name: "eggplant", amount: "1, sliced" },
        { name: "olive oil", amount: "2 tablespoons" },
        { name: "salt", amount: "1/2 teaspoon" },
        { name: "black pepper", amount: "1/4 teaspoon" },
        { name: "quinoa", amount: "1 cup, rinsed" },
        { name: "water", amount: "2 cups" },
        { name: "lemon juice", amount: "1/4 cup" },
        { name: "olive oil", amount: "1/4 cup" },
        { name: "garlic", amount: "2 cloves, minced" },
        { name: "dijon mustard", amount: "1 teaspoon" },
        { name: "honey", amount: "1 teaspoon" },
        { name: "fresh basil leaves", amount: "1/4 cup, chopped" },
        { name: "fresh parsley leaves", amount: "1/4 cup, chopped" },
      ],
      instructions: [
        "Preheat the oven to 400°F.",
        "Place the sliced onion, red and yellow bell pepper, zucchini, and eggplant on a baking sheet.",
        "Drizzle with olive oil and season with salt and black pepper.",
        "Roast for 25-30 minutes, or until the vegetables are tender and lightly browned.",
        "Meanwhile, cook the quinoa according to package directions.",
        "In a small bowl, whisk together the lemon juice, olive oil, minced garlic, dijon mustard, and honey to make the vinaigrette.",
        "In a large bowl, combine the cooked quinoa and roasted vegetables.",
        "Pour the vinaigrette over the salad and toss to coat.",
        "Sprinkle with chopped basil and parsley leaves before serving.",
      ],
      categories: ["salad", "vegetarian", "healthy"],
    },
  ];

  await storageService.post(STORAGE_KEY, recipes[0])
  await storageService.post(STORAGE_KEY, recipes[1])
  await storageService.post(STORAGE_KEY, recipes[2])
}

window.pr = postRecipes
