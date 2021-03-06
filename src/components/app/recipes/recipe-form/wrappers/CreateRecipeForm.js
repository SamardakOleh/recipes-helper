import React, {Component} from 'react';
import RecipeForm from "../RecipeForm";
import '../create-recipe.css'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import Loader from "../../../util/Loader";
import {NotificationManager} from "react-notifications";

class CreateRecipeForm extends Component {
    constructor() {
        super();
        this.state ={
            formRecipe: {},
            toMyRecipes: false,
            loader: false
        };
        this.addFormSubmit = this.addFormSubmit.bind(this);
    }

    onChange = (formRecipe) =>{
        let state = {...this.state};
        state.formRecipe = formRecipe;
        this.setState(state)
    };

    addFormSubmit(recipe){
        this.setState({...this.state, loader: true});
        axios.post('/api/recipes', recipe)
            .then(() => this.setState({...this.state, toMyRecipes: true, loader:false}))
            .catch(e => NotificationManager.error('An error', `${e.message}`));
    }

    render() {
        if (this.state.loader)
            return <Loader/>;
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