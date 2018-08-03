import React, { Component } from 'react';
import Recipe from './recipe/Recipe';
import './recipes.css';
import FindRecipeForm from './recipe-form/wrappers/FindRecipeForm';
import axios from 'axios';
import Loader from '../util/Loader';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import {
  editRecipe,
  filterRecipes,
  getAllRecipes,
  getUsersRecipes,
  showFilteredRecipes,
  showRecipes
} from '../../../redux/actions/recipesActions';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recipes: [],
      filteredRecipes: [],
      showFilteredRecipes: false,
      showRecipes: false,
      loader: true
    };
  }

  onRecipesFilter = recipes => {
    console.log(recipes);
    this.props.filterRecipes(recipes);
  };

  deleteRecipe = () => {
    this.getRecipes();
  };

  render() {
    const recipesArr = this.props.forUser
      ? this.props.recipes.usersRecipes
      : this.props.recipes.displayRecipes;

    if (this.props.recipes.loader) return <Loader />;
    let recipes = null;
    if (recipesArr.length !== 0 && this.props.recipes.showRecipes) {
      recipes = (
        <div className={'col-lg-8 col-sm-11'}>
          <div className={'row'}>
            {recipesArr.map(recipe => {
              return (
                <Recipe
                  onDeleteRecipe={this.deleteRecipe}
                  forUser={this.props.forUser}
                  key={recipe._id}
                  recipe={recipe}
                />
              );
            })}
          </div>
        </div>
      );
    } else if (
      this.props.recipes.showFilteredRecipes &&
      this.props.recipes.filterRecipes.length !== 0
    ) {
      recipes = (
        <div className={'col-lg-8 col-sm-11'}>
          <div className={'row'}>
            {this.props.recipes.filterRecipes.map(recipe => {
              return (
                <Recipe
                  deleteRecipe={this.deleteRecipe}
                  forUser={this.props.forUser}
                  key={recipe._id}
                  recipe={recipe}
                />
              );
            })}
          </div>
        </div>
      );
    } else if (this.props.forUser && recipesArr.length === 0)
      recipes = (
        <div className={'col-lg-8 col-sm-11'}>
          <div className={'row'}>
            У вас еще нет добавленных рецептов. Нажмите кнопку "добавить", если
            хотите добавить.
          </div>
        </div>
      );

    return (
      <div className={'row'}>
        <aside className={'m-2 col-lg-3 col-sm-11'}>
          <FindRecipeForm
            onFilter={this.onRecipesFilter}
            recipes={this.props.recipes.displayRecipes}
          />
        </aside>
        {recipes}
      </div>
    );
  }

  getRecipes = () => {
    if (this.props.forUser) {
      this.props.getUsersRecipes();
    } else {
      this.props.getAllRecipes();
    }
  };

  componentDidMount() {
    this.getRecipes();
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  {
    editRecipe,
    filterRecipes,
    getAllRecipes,
    getUsersRecipes,
    showFilteredRecipes,
    showRecipes
  }
)(Recipes);
