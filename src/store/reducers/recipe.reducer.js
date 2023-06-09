export const SET_RECIPES = "SET_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_USER_RECIPES = "SET_USER_RECIPES";
export const REMOVE_USER_RECIPE = "REMOVE_USER_RECIPE";

const INITIAL_STATE = {
  recipes: null,
  userRecipes: null,
  filterBy: {
    title: "",
    userId: "",
    categories: [],
    prepTime: 0,
    cookTime: 0,
  },
};

export function recipeReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe],
      };
    case REMOVE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.recipeId
        ),
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.recipe._id ? action.recipe : recipe
        ),
      };
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy },
      };

    default:
      return state;
  }
}
