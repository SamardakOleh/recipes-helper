import React, {Component} from 'react';
import './header.css';
import {Link} from "react-router-dom";

class Header extends Component {
    authService;

    constructor(props) {
        super();
        this.props = props;
    }

    login() {
        this.props.authService.login();
    }


    render() {
        let logOutItem =
            (
                <div>
                    <div onClick={() => this.props.authService.logout()}>
                        <Link className="nav-item nav-link" to={'/recipes'}>Выйти</Link>
                    </div>
                </div>
            );
        let isLoggedIn = this.props.authService.isLoggedIn();

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">Brand</a>
                <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to={'/recipes'}>Рецепты</Link>
                        <Link className="nav-item nav-link" to={`/recipes/my`}>Мои рецепты</Link>
                    </div>
                    <div className={'navbar-nav ml-auto'}>
                        {isLoggedIn ?
                            logOutItem :
                            <a className="nav-item nav-link" onClick={() => this.login()}>Войти</a>
                        }
                    </div>
                </div>
            </nav>
        )
    }

    componentDidMount() {
    }
}

export default Header;