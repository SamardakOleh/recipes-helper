import React, {Component} from 'react';
import './App.scss';
import Header from "./header/Header";
import Recipes from "./recipes/Recipes";
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from './util/history'
import MyRecipes from "./recipes/my-recipes/MyRecipes";
import AuthService from "./auth/AuthService";
import Callback from "./util/Callback";
import CreateRecipeForm from "./recipes/recipe-form/wrappers/CreateRecipeForm";
import axios from "axios/index";
import UpdateRecipeForm from "./recipes/recipe-form/wrappers/UpdateRecipeForm";

const authService = new AuthService();
const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        return authService.handleAuthentication();
    }
};

class App extends Component {

    render() {
        if (localStorage.getItem('id_token'))
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

        return (
            <Router history={history}>
                <div>
                    <Header authService={authService}/>
                    <div className={''}>
                        <Switch>
                            <Route exact path={'/'} component={Recipes}/>
                            <Route exact path={'/recipes'} component={Recipes}/>
                            <Route path={'/callback'}  render={(props) => {
                                handleAuthentication(props);
                                return <Callback{...props}/>
                            }}/>
                            <Route exact path={'/recipes/my'}
                                          render={(props) => {return <MyRecipes authService={authService} {...props}/>}}/>
                            <Route exact path={'/recipes/my/add'} render={props => {
                                return <CreateRecipeForm {...props}/>
                            }}/>
                            <Route exact path={'/recipes/my/edit'} render={props => {
                                return <UpdateRecipeForm recipe={JSON.parse(localStorage.getItem('recipeForEdit'))} {...props}/>
                            }}/>
                        </Switch>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
