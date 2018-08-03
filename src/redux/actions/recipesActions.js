import {
  EDIT_RECIPE,
  GET_RECIPES,
  GET_MY_RECIPES,
  FILTER_RECIPES,
  SHOW_FILTERED_RECIPES,
  SHOW_LOADER,
  SHOW_RECIPES
} from './types';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import Recipes from '../../components/app/recipes/Recipes';

export const editRecipe = recipe => {
  return {
    type: EDIT_RECIPE,
    payload: recipe
  };
};

export const getAllRecipes = () => dispatch => {
  let url = `/api/recipes`;
  dispatch(showRecipes(false));
  dispatch(showFilteredRecipes(false));
  dispatch(showLoader(true));
  axios
    .get(url)
    .then(recipes => {
      dispatch(showRecipes(true));
      dispatch(showLoader(false));
      dispatch({
        type: GET_RECIPES,
        payload: recipes.data
      });
    })
    .catch(e => NotificationManager.success('An error', e));
};

export const getUsersRecipes = () => dispatch => {
  let url = `/api/recipes/my`;
  dispatch(showRecipes(false));
  dispatch(showFilteredRecipes(false));
  dispatch(showLoader(true));
  axios
    .get(url)
    .then(recipes => {
      dispatch(showRecipes(true));
      dispatch(showLoader(false));
      dispatch({
        type: GET_MY_RECIPES,
        payload: recipes.data
      });
    })
    .catch(e => NotificationManager.success('An error', e));
};

export const filterRecipes = recipes => dispatch => {
  dispatch(showFilteredRecipes(true));
  dispatch(showRecipes(false));
  dispatch({
    type: FILTER_RECIPES,
    payload: recipes
  });
};

export const showFilteredRecipes = value => {
  return {
    type: SHOW_FILTERED_RECIPES,
    payload: value
  };
};

export const showLoader = value => {
  return {
    type: SHOW_LOADER,
    payload: value
  };
};

export const showRecipes = value => {
  return {
    type: SHOW_RECIPES,
    payload: value
  };
};
