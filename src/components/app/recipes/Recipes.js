import React, {Component} from 'react';
import Recipe from "./recipe/Recipe";
import './recipes.css'
import FindRecipeForm from "./recipe-form/wrappers/FindRecipeForm";
import axios from 'axios'
import Loader from "../util/Loader";

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            recipes: [],
            filteredRecipes: [],
            showFilteredRecipes: false,
            showRecipes: false
        }
    }

    onRecipesFilter = (recipes) => {
        let state = {...this.state};
        state.filteredRecipes = recipes;
        state.showFilteredRecipes = true;
        state.showRecipes = false;
        this.setState(state);
    };

    deleteRecipe = () => {
        this.getRecipes();
    };

    render() {
        let recipes = null;
        if (!this.state.showRecipes)
            recipes = (
                <div className={'m-auto'}>
                    <Loader/>
                </div>
            );
        else if (this.state.recipes.length !== 0) {
            recipes = (
                <div className={'col-lg-8 col-sm-11'}>
                    <div className={'row'}>
                        {this.state.recipes.map(recipe => {
                            return <Recipe onDeleteRecipe={this.deleteRecipe} forUser={this.props.forUser}
                                           key={recipe._id} recipe={recipe}/>
                        })}
                    </div>
                </div>
            )
        }
        else if (this.state.showFilteredRecipes && this.state.filteredRecipes.length !== 0) {
            recipes = (
                <div className={'col-lg-8 col-sm-11'}>
                    <div className={'row'}>
                        {this.state.filteredRecipes.map(recipe => {
                            return <Recipe deleteRecipe={this.deleteRecipe} forUser={this.props.forUser}
                                           key={recipe._id} recipe={recipe}/>
                        })}
                    </div>
                </div>
            )
        }
        else if (this.props.forUser && this.state.recipes.length === 0)
            recipes = (
                <div className={'col-lg-8 col-sm-11'}>
                    <div className={'row'}>
                        У вас еще нет добавленных рецептов. Нажмите кнопку "добавить", если хотите добавить.
                    </div>
                </div>
            );

        return (
            <div className={'row'}>
                <aside className={'m-2 col-lg-3 col-sm-11'}>
                    <FindRecipeForm onFilter={this.onRecipesFilter} recipes={this.state.recipes}/>
                </aside>
                {recipes}
            </div>
        )
    }

    getRecipes = () => {
        this.state.showRecipes = false;
        let url = '';
        if (this.props.forUser) {

            url = `/api/recipes/my`;
            axios.get(url).then(recipes => this.setState({
                recipes: recipes.data,
                showRecipes: true
            }))
        }
        else {
            url = `/api/recipes`;
            axios.get(url).then(recipes => this.setState({
                recipes: recipes.data,
                showRecipes: true
            }))
        }

    };

    componentDidMount() {
        this.getRecipes();
    }
}

export default Recipes;