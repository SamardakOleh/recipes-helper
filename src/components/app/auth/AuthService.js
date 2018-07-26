import auth0 from 'auth0-js';
import history from '../util/history'
import axios from "axios";

const RECIPES_URL = '/recipes';
export default class AuthService {
    auth0;
    _userProfile;

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.auth0 = new auth0.WebAuth({
            domain: 'recipes-helper.eu.auth0.com',
            clientID: '38IcRzzEB7pdMGBikdv21JCMmTcVQHBm',
            redirectUri: 'https://recipes-helper.herokuapp.com/callback',
            audience: 'https://recipes-helper.eu.auth0.com/userinfo',
            responseType: 'token id_token',
            scope: 'openid profile'
        });
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.getUser(authResult.accessToken).then(user => {
                    localStorage.setItem('profile', JSON.stringify(user));
                    history.replace('/recipes');
                });

            } else if (err) {
                history.replace(RECIPES_URL);
                console.log(err);
            }
        })
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        axios.defaults.headers.common['Authorization'] = authResult.idToken;
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile');
    }

    isLoggedIn() {

        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        if (expiresAt)
            return new Date().getTime() < expiresAt;
        else
            return false;
    }

    getUser(accessToken) {
        return new Promise((resolve, reject) => {
            this.auth0.client.userInfo(accessToken, (err, profile) => {
                if (err)
                    reject(err);
                else {
                    resolve(profile)
                }
            });
        })
    }

    getUserProfile(){
        return this._userProfile;
    }

    login() {
        this.auth0.authorize();
    }

}