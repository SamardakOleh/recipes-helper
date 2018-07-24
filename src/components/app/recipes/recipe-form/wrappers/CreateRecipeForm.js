import React, {Component} from 'react';
import RecipeForm from "../RecipeForm";
import '../create-recipe.css'
import axios from 'axios'
import {Redirect} from "react-router-dom";

class CreateRecipeForm extends Component {
    constructor() {
        super();
        this.state ={
            formRecipe: {},
            toMyRecipes: false
        }
    }

    onChange = (formRecipe) =>{
        let state = {...this.state};
        state.formRecipe = formRecipe;
        this.setState(state)
    };

    addFormSubmit(e, recipe){
        e.preventDefault();
        axios.post('http://localhost:4000/recipes', recipe).then(() => {
            let state = {...this.state};
            state.toMyRecipes = true;
            this.setState(state);
        }).catch(e => console.error(e));
    }

    render() {
        if (this.state.toMyRecipes)
            return <Redirect to={'/recipes/my'}/>;
        return (
            <div className={'create-or-edit-recipe-form'}>
                <RecipeForm onChange={this.onChange} buttonName={'Добавить'} submitHandler={this.addFormSubmit}/>
            </div>
        )
    }

    componentDidMount() {
    }
}

export default CreateRecipeForm;