import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import data from '../assets/json/recipe.json'

const STORAGE_KEY = "recipe";

export const recipeService = {
  query,
  getById,
  save,
  remove,
  getEmptyRecipe,
  postRecipes,
  getEmptyIngredient,
  getEmptyFilterBy,
};
window.rs = recipeService;

async function query(filterBy = { title: "" }) {
  // console.log("filterBy: ", filterBy);

  var recipes = await storageService.query(STORAGE_KEY);
  if (!recipes || recipes.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    recipes = data;
  }
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    recipes = recipes.filter((recipe) => regex.test(recipe.title));
  }
  if (filterBy.userId) {
    recipes = recipes.filter(
      (recipe) => recipe.createdBy._id === filterBy.userId
    );
  }
  if (filterBy.ids) {
    // const {ids} = filterBy
    recipes = recipes.filter((recipe) => filterBy.ids.includes(recipe._id));
  }
  if (filterBy.categories?.length) {
    recipes = recipes.filter((recipe) =>
    filterBy.categories.every((category) =>
        recipe.categories.includes(category)
      )
    );
  }
  if (filterBy.prepTime){
    recipes = recipes.filter((recipe) => filterBy.prepTime <= recipe.prepTime);
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
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    ingredients: [],
    instructions: [],
    categories: [],
  };
}

function getEmptyIngredient() {
  return {
    name: "",
    amount: 0,
    servingSize: "",
    description: "",
  };
}

function getEmptyFilterBy() {
  return {
    title: "",
    userId: "",
    categories: [],
    prepTime: 0,
    cookTime: 0,
  };
}

async function postRecipes() {
  const recipes = [
    {
      title: "Spaghetti Bolognese",
      description:
        "A classic Italian dish with a rich tomato sauce and ground beef.",
      imgUrl:
        "https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36-720x720.jpg",
      prepTime: 20,
      cookTime: 60,
      servings: 4,
      ingredients: [
        {
          name: "Spaghetti",
          amount: 1,
          servingSize: "pound",
          description: "dried",
        },
        {
          name: "Ground Beef",
          amount: 1,
          servingSize: "pound",
          description: "lean",
        },
        {
          name: "Onion",
          amount: 1,
          servingSize: "medium",
          description: "chopped",
        },
        {
          name: "Garlic",
          amount: 3,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "Crushed Tomatoes",
          amount: 28,
          servingSize: "ounces",
          description: "",
        },
        {
          name: "Tomato Paste",
          amount: 2,
          servingSize: "tablespoons",
          description: "",
        },
        {
          name: "Red Wine",
          amount: 1,
          servingSize: "cup",
          description: "",
        },
        {
          name: "Beef Broth",
          amount: 1,
          servingSize: "cup",
          description: "",
        },
        {
          name: "Olive Oil",
          amount: 2,
          servingSize: "tablespoons",
          description: "",
        },
        {
          name: "Salt",
          amount: 1,
          servingSize: "teaspoon",
          description: "",
        },
        {
          name: "Black Pepper",
          amount: 1,
          servingSize: "teaspoon",
          description: "",
        },
      ],
      instructions: [
        "In a large pot, bring salted water to a boil and cook the spaghetti according to package instructions.",
        "In a large skillet, heat the olive oil over medium heat. Add the onion and cook until softened, about 5 minutes.",
        "Add the garlic and cook for another minute.",
        "Add the ground beef and cook until browned, breaking it up into small pieces as it cooks.",
        "Stir in the crushed tomatoes, tomato paste, red wine, beef broth, salt, and black pepper.",
        "Bring the sauce to a simmer and cook for 30-40 minutes, stirring occasionally.",
        "Serve the spaghetti with the sauce on top.",
      ],
      categories: ["Italian", "Pasta", "Meat", "Dinner"],
      createdBy: {
        fullname: "Shahar Saadon",
        _id: "u100",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png",
      },
    },
    {
      title: "Garlic Roasted Broccoli",
      description:
        "A simple and delicious recipe for roasted broccoli with garlic and olive oil.",
      imgUrl:
        "https://www.kitchensanctuary.com/wp-content/uploads/2021/10/Roasted-Broccoli-with-garlic-square-FS-39.jpg",
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      ingredients: [
        {
          name: "broccoli florets",
          amount: 1,
          servingSize: "cup",
          description: "fresh",
        },
        {
          name: "garlic",
          amount: 2,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "olive oil",
          amount: 2,
          servingSize: "tablespoons",
          description: "",
        },
        {
          name: "salt",
          amount: 1,
          servingSize: "teaspoon",
          description: "",
        },
        {
          name: "black pepper",
          amount: 1 / 4,
          servingSize: "teaspoon",
          description: "freshly ground",
        },
      ],
      instructions: [
        "Preheat the oven to 400°F.",
        "Spread the broccoli florets out on a baking sheet and drizzle with olive oil.",
        "Sprinkle the minced garlic, salt, and black pepper over the broccoli, and toss to coat.",
        "Roast in the preheated oven for 20 minutes, until tender and lightly browned.",
        "Serve hot, garnished with additional black pepper if desired.",
      ],
      categories: ["Vegetables", "Side Dishes", "Healthy Eating"],
      createdBy: {
        fullname: "Tomer Huberman",
        _id: "u102",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
      },
    },
    {
      title: "Grilled Salmon with Lemon Butter",
      description: "Juicy grilled salmon with a tangy lemon butter sauce.",
      imgUrl:
        "https://umamidays.com/wp-content/uploads/2021/05/salmon-lemon-garlic-sauce-1200x900.jpg",
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      ingredients: [
        {
          name: "salmon fillets",
          amount: 4,
          servingSize: "6 oz",
          description: "skin-on or skinless",
        },
        {
          name: "lemon",
          amount: 1,
          servingSize: "1",
          description: "juiced and zested",
        },
        {
          name: "butter",
          amount: 4,
          servingSize: "tbsp",
          description: "unsalted",
        },
        {
          name: "olive oil",
          amount: 2,
          servingSize: "tbsp",
          description: "",
        },
        {
          name: "garlic",
          amount: 2,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "salt",
          amount: 1,
          servingSize: "tsp",
          description: "",
        },
        {
          name: "black pepper",
          amount: 1,
          servingSize: "tsp",
          description: "freshly ground",
        },
      ],
      instructions: [
        "Preheat grill to medium-high heat.",
        "In a small saucepan, melt butter over low heat. Add minced garlic and sauté for 1 minute, then remove from heat and stir in lemon juice and zest.",
        "Brush salmon fillets with olive oil and season with salt and pepper.",
        "Place salmon on the grill, skin-side down, and cook for 5-6 minutes.",
        "Using a spatula, carefully flip the salmon and cook for an additional 4-5 minutes, or until cooked to your liking.",
        "Remove salmon from the grill and transfer to a serving platter. Pour lemon butter sauce over the top and serve immediately.",
      ],
      categories: ["Seafood", "Grilling", "Healthy"],
      createdBy: {
        fullname: "Ido Peri",
        _id: "u101",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
      },
    },
    {
      title: "Spaghetti Carbonara",
      description:
        "A classic Italian dish made with spaghetti, bacon, eggs, and Parmesan cheese.",
      imgUrl:
        "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      ingredients: [
        {
          name: "Spaghetti",
          amount: 8,
          servingSize: "oz",
          description: "dried",
        },
        {
          name: "Bacon",
          amount: 6,
          servingSize: "slices",
          description: "thick-cut",
        },
        {
          name: "Eggs",
          amount: 2,
          servingSize: "",
          description: "",
        },
        {
          name: "Parmesan cheese",
          amount: 1,
          servingSize: "cup",
          description: "grated",
        },
        {
          name: "Garlic",
          amount: 2,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "Salt",
          amount: 1,
          servingSize: "tsp",
          description: "",
        },
        {
          name: "Black pepper",
          amount: 1,
          servingSize: "tsp",
          description: "freshly ground",
        },
      ],
      instructions: [
        "Bring a large pot of salted water to a boil. Add spaghetti and cook until al dente.",
        "Meanwhile, cook bacon in a large skillet over medium heat until crispy. Remove bacon and crumble into small pieces.",
        "Whisk eggs, Parmesan cheese, garlic, salt, and pepper together in a bowl.",
        "Drain spaghetti and reserve 1/2 cup of pasta water.",
        "Add spaghetti to skillet with bacon and toss to combine. Remove skillet from heat.",
        "Add egg mixture and pasta water to skillet with spaghetti and bacon. Toss until well coated and sauce thickens.",
        "Serve hot, garnished with additional Parmesan cheese and black pepper if desired.",
      ],
      categories: ["Italian", "Pasta", "Comfort food"],
      createdBy: {
        fullname: "Puki Ka",
        _id: "u103",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
      },
    },
    {
      title: "Spaghetti Bolognese",
      description:
        "A classic Italian dish with a rich tomato sauce and ground beef.",
      imgUrl:
        "https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36-720x720.jpg",
      prepTime: 20,
      cookTime: 60,
      servings: 4,
      ingredients: [
        {
          name: "Spaghetti",
          amount: 1,
          servingSize: "pound",
          description: "dried",
        },
        {
          name: "Ground Beef",
          amount: 1,
          servingSize: "pound",
          description: "lean",
        },
        {
          name: "Onion",
          amount: 1,
          servingSize: "medium",
          description: "chopped",
        },
        {
          name: "Garlic",
          amount: 3,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "Crushed Tomatoes",
          amount: 28,
          servingSize: "ounces",
          description: "",
        },
        {
          name: "Tomato Paste",
          amount: 2,
          servingSize: "tablespoons",
          description: "",
        },
        {
          name: "Red Wine",
          amount: 1,
          servingSize: "cup",
          description: "",
        },
        {
          name: "Beef Broth",
          amount: 1,
          servingSize: "cup",
          description: "",
        },
        {
          name: "Olive Oil",
          amount: 2,
          servingSize: "tablespoons",
          description: "",
        },
        {
          name: "Salt",
          amount: 1,
          servingSize: "teaspoon",
          description: "",
        },
        {
          name: "Black Pepper",
          amount: 1,
          servingSize: "teaspoon",
          description: "",
        },
      ],
      instructions: [
        "In a large pot, bring salted water to a boil and cook the spaghetti according to package instructions.",
        "In a large skillet, heat the olive oil over medium heat. Add the onion and cook until softened, about 5 minutes.",
        "Add the garlic and cook for another minute.",
        "Add the ground beef and cook until browned, breaking it up into small pieces as it cooks.",
        "Stir in the crushed tomatoes, tomato paste, red wine, beef broth, salt, and black pepper.",
        "Bring the sauce to a simmer and cook for 30-40 minutes, stirring occasionally.",
        "Serve the spaghetti with the sauce on top.",
      ],
      categories: ["Italian", "Pasta", "Meat", "Dinner"],
      createdBy: {
        fullname: "Shahar Saadon",
        _id: "u100",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png",
      },
    },
    {
      title: "Garlic Roasted Broccoli",
      description:
        "A simple and delicious recipe for roasted broccoli with garlic and olive oil.",
      imgUrl:
        "https://www.kitchensanctuary.com/wp-content/uploads/2021/10/Roasted-Broccoli-with-garlic-square-FS-39.jpg",
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      ingredients: [
        {
          name: "broccoli florets",
          amount: 1,
          servingSize: "cup",
          description: "fresh",
        },
        {
          name: "garlic",
          amount: 2,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "olive oil",
          amount: 2,
          servingSize: "tablespoons",
          description: "",
        },
        {
          name: "salt",
          amount: 1,
          servingSize: "teaspoon",
          description: "",
        },
        {
          name: "black pepper",
          amount: 1 / 4,
          servingSize: "teaspoon",
          description: "freshly ground",
        },
      ],
      instructions: [
        "Preheat the oven to 400°F.",
        "Spread the broccoli florets out on a baking sheet and drizzle with olive oil.",
        "Sprinkle the minced garlic, salt, and black pepper over the broccoli, and toss to coat.",
        "Roast in the preheated oven for 20 minutes, until tender and lightly browned.",
        "Serve hot, garnished with additional black pepper if desired.",
      ],
      categories: ["Vegetables", "Side Dishes", "Healthy Eating"],
      createdBy: {
        fullname: "Tomer Huberman",
        _id: "u102",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
      },
    },
    {
      title: "Grilled Salmon with Lemon Butter",
      description: "Juicy grilled salmon with a tangy lemon butter sauce.",
      imgUrl:
        "https://umamidays.com/wp-content/uploads/2021/05/salmon-lemon-garlic-sauce-1200x900.jpg",
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      ingredients: [
        {
          name: "salmon fillets",
          amount: 4,
          servingSize: "6 oz",
          description: "skin-on or skinless",
        },
        {
          name: "lemon",
          amount: 1,
          servingSize: "1",
          description: "juiced and zested",
        },
        {
          name: "butter",
          amount: 4,
          servingSize: "tbsp",
          description: "unsalted",
        },
        {
          name: "olive oil",
          amount: 2,
          servingSize: "tbsp",
          description: "",
        },
        {
          name: "garlic",
          amount: 2,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "salt",
          amount: 1,
          servingSize: "tsp",
          description: "",
        },
        {
          name: "black pepper",
          amount: 1,
          servingSize: "tsp",
          description: "freshly ground",
        },
      ],
      instructions: [
        "Preheat grill to medium-high heat.",
        "In a small saucepan, melt butter over low heat. Add minced garlic and sauté for 1 minute, then remove from heat and stir in lemon juice and zest.",
        "Brush salmon fillets with olive oil and season with salt and pepper.",
        "Place salmon on the grill, skin-side down, and cook for 5-6 minutes.",
        "Using a spatula, carefully flip the salmon and cook for an additional 4-5 minutes, or until cooked to your liking.",
        "Remove salmon from the grill and transfer to a serving platter. Pour lemon butter sauce over the top and serve immediately.",
      ],
      categories: ["Seafood", "Grilling", "Healthy"],
      createdBy: {
        fullname: "Ido Peri",
        _id: "u101",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
      },
    },
    {
      title: "Spaghetti Carbonara",
      description:
        "A classic Italian dish made with spaghetti, bacon, eggs, and Parmesan cheese.",
      imgUrl:
        "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      ingredients: [
        {
          name: "Spaghetti",
          amount: 8,
          servingSize: "oz",
          description: "dried",
        },
        {
          name: "Bacon",
          amount: 6,
          servingSize: "slices",
          description: "thick-cut",
        },
        {
          name: "Eggs",
          amount: 2,
          servingSize: "",
          description: "",
        },
        {
          name: "Parmesan cheese",
          amount: 1,
          servingSize: "cup",
          description: "grated",
        },
        {
          name: "Garlic",
          amount: 2,
          servingSize: "cloves",
          description: "minced",
        },
        {
          name: "Salt",
          amount: 1,
          servingSize: "tsp",
          description: "",
        },
        {
          name: "Black pepper",
          amount: 1,
          servingSize: "tsp",
          description: "freshly ground",
        },
      ],
      instructions: [
        "Bring a large pot of salted water to a boil. Add spaghetti and cook until al dente.",
        "Meanwhile, cook bacon in a large skillet over medium heat until crispy. Remove bacon and crumble into small pieces.",
        "Whisk eggs, Parmesan cheese, garlic, salt, and pepper together in a bowl.",
        "Drain spaghetti and reserve 1/2 cup of pasta water.",
        "Add spaghetti to skillet with bacon and toss to combine. Remove skillet from heat.",
        "Add egg mixture and pasta water to skillet with spaghetti and bacon. Toss until well coated and sauce thickens.",
        "Serve hot, garnished with additional Parmesan cheese and black pepper if desired.",
      ],
      categories: ["Italian", "Pasta", "Comfort food"],
      createdBy: {
        fullname: "Puki Ka",
        _id: "u103",
        imgUrl:
          "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
      },
    },
  ];

  await storageService.post(STORAGE_KEY, recipes[0]);
  await storageService.post(STORAGE_KEY, recipes[1]);
  await storageService.post(STORAGE_KEY, recipes[2]);
  await storageService.post(STORAGE_KEY, recipes[3]);
  await storageService.post(STORAGE_KEY, recipes[4]);
  await storageService.post(STORAGE_KEY, recipes[5]);
  await storageService.post(STORAGE_KEY, recipes[6]);
  await storageService.post(STORAGE_KEY, recipes[7]);
  await storageService.post(STORAGE_KEY, recipes[8]);
}

window.pr = postRecipes;
