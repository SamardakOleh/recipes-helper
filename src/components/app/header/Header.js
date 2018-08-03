import React, { Component } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import sweetroll from "./SweetRoll.png";
import { connect } from "react-redux";
import { logOut } from "../../../redux/actions/authActions";
import store from "../../../redux/store";

class Header extends Component {
  authService;

  constructor(props) {
    super();
    this.props = props;
    this.state = {};
  }

  login() {
    this.props.authService.login();
  }

  render() {
    let logOutItem;
    let logInItem;
    let isLoggedIn = this.state.auth ? this.state.auth.isAuthentificated : null;
    if (isLoggedIn)
      logOutItem = (
        <div className={"d-flex"}>
          <img
            className={"rounded avatar"}
            src={this.state.auth.user ? this.state.auth.user.picture : null}
          />
          <div onClick={() => store.dispatch({ type: "LOG_OUT" })}>
            <Link className="nav-item nav-link" to={"/recipes"}>
              Выйти
            </Link>
          </div>
        </div>
      );
    else
      logInItem = (
        <a className="nav-item nav-link" onClick={() => this.login()}>
          Войти
        </a>
      );

    return (
      <nav className="navbar navbar-header navbar-expand-lg navbar-dark bg-dark">
        <img src={sweetroll} className="roll navbar-brand" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to={"/recipes"}>
              Рецепты
            </Link>
            <Link className="nav-item nav-link" to={`/recipes/my`}>
              Мои рецепты
            </Link>
          </div>
          <div className={"navbar-nav ml-auto"}>
            {isLoggedIn ? logOutItem : logInItem}
          </div>
        </div>
      </nav>
    );
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        ...this.state,
        auth: store.getState().auth ? store.getState().auth : null
      });
    });
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(Header);
