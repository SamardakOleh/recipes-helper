import auth0 from "auth0-js";

export default class AuthService {
  auth0;

  constructor() {
    this.login = this.login.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.auth0 = new auth0.WebAuth({
      domain: "recipes-helper.eu.auth0.com",
      clientID: "38IcRzzEB7pdMGBikdv21JCMmTcVQHBm",
      redirectUri: "http://localhost:3000/callback",
      audience: "https://recipes-helper.eu.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid profile"
    });
  }

  isLoggedIn() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    if (expiresAt) return new Date().getTime() < expiresAt;
    else return false;
  }

  login() {
    this.auth0.authorize();
  }
}
