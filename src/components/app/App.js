import React, { Component } from "react";
import "./App.scss";
import Header from "./header/Header";
import Recipes from "./recipes/Recipes";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./util/history";
import MyRecipes from "./recipes/my-recipes/MyRecipes";
import AuthService from "./auth/AuthService";
import Callback from "./util/Callback";
import CreateRecipeForm from "./recipes/recipe-form/wrappers/CreateRecipeForm";
import axios from "axios/index";
import UpdateRecipeForm from "./recipes/recipe-form/wrappers/UpdateRecipeForm";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { connect } from "react-redux";
import store from "../../redux/store";
import { handleAuth } from "../../redux/actions/authActions";

const authService = new AuthService();

class App extends Component {
  render() {
    if (localStorage.getItem("id_token"))
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "id_token"
      );

    return (
      <Router history={history}>
        <div>
          <Header authService={authService} />
          <div className={""}>
            <Switch>
              <Route exact path={"/"} component={Recipes} />
              <Route exact path={"/recipes"} component={Recipes} />
              <Route
                path={"/callback"}
                render={props => {
                  this.props.handleAuth(props);
                  return <Callback {...props} />;
                }}
              />
              <Route
                exact
                path={"/recipes/my"}
                render={props => {
                  return <MyRecipes authService={authService} {...props} />;
                }}
              />
              <Route
                exact
                path={"/recipes/my/add"}
                render={props => {
                  return <CreateRecipeForm {...props} />;
                }}
              />
              <Route
                exact
                path={"/recipes/my/edit"}
                render={props => {
                  return (
                    <UpdateRecipeForm
                      recipe={JSON.parse(localStorage.getItem("recipeForEdit"))}
                      {...props}
                    />
                  );
                }}
              />
            </Switch>
          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { handleAuth }
)(App);
