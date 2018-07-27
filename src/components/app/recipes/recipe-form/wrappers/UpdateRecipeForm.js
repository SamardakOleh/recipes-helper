import React, {Component} from 'react';
import RecipeForm from "../RecipeForm";
import '../create-recipe.css'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import {NotificationManager} from "react-notifications";

class UpdateRecipeForm extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state ={
            formRecipe: {},
            toMyRecipes : false
        }
    }

    onChange = (formRecipe) =>{
        let state = {...this.state};
        state.formRecipe = formRecipe;
        this.setState(state)
    };

    submit = (recipe) =>{
        axios.patch(`/api/recipes/${recipe._id}`, recipe)
            .then(() => this.setState({...this.state, toMyRecipes: true}))
            .catch(e => NotificationManager.error('An error', `${e.message}`));
    };

    render() {
        if (this.state.toMyRecipes)
            return <Redirect to={'/recipes/my'}/>;
        return (
            <div className={'create-or-edit-recipe-form'}>
                <RecipeForm
                    recipe={this.props.recipe}
                    onChange={this.onChange}
                    buttonName={'Изменить'}
                    submitHandler={this.submit}/>
            </div>
        )
    }

    componentDidMount() {
    }
}

export default UpdateRecipeForm;