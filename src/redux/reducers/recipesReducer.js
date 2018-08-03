import {
  EDIT_RECIPE,
  GET_MY_RECIPES,
  GET_RECIPES,
  SHOW_FILTERED_RECIPES,
  SHOW_LOADER,
  SHOW_RECIPES,
  FILTER_RECIPES
} from '../actions/types';

const initialState = {
  displayRecipes: [],
  usersRecipes: [],
  filterRecipes: [],
  showFilteredRecipes: false,
  showRecipes: false,
  showLoader: true,
  editRecipe: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_RECIPE: {
      return {
        ...state,
        editRecipe: action.payload
      };
    }
    case GET_MY_RECIPES: {
      return {
        ...state,
        usersRecipes: action.payload
      };
    }
    case GET_RECIPES: {
      return {
        ...state,
        displayRecipes: action.payload
      };
    }
    case SHOW_FILTERED_RECIPES: {
      return {
        ...state,
        showFilteredRecipes: action.payload
      };
    }
    case SHOW_RECIPES: {
      return {
        ...state,
        showRecipes: action.payload
      };
    }
    case SHOW_LOADER: {
      return {
        ...state,
        showLoader: action.payload
      };
    }
    case FILTER_RECIPES: {
      return {
        ...state,
        filterRecipes: action.payload
      };
    }
    default:
      return state;
  }
}
