import { SET_USER, HANDLE_AUTH, LOG_OUT } from "./types";
import axios from "axios";
import auth0 from "auth0-js";
import history from "../../components/app/util/history";

const authService = new auth0.WebAuth({
  domain: "recipes-helper.eu.auth0.com",
  clientID: "38IcRzzEB7pdMGBikdv21JCMmTcVQHBm",
  redirectUri: "http://localhost:3000/callback",
  audience: "https://recipes-helper.eu.auth0.com/userinfo",
  responseType: "token id_token",
  scope: "openid profile"
});

const handleAuthentication = () => dispatch => {
  authService.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
      getUser(authResult.accessToken).then(user => {
        dispatch({
          type: SET_USER,
          payload: user
        });
        localStorage.setItem("profile", JSON.stringify(user));
        history.replace("/recipes");
      });
    } else if (err) {
      history.replace("/recipes");
      console.log(err);
    }
  });
};

const setSession = authResult => {
  // Set the time that the Access Token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem("access_token", authResult.accessToken);
  localStorage.setItem("id_token", authResult.idToken);
  localStorage.setItem("expires_at", expiresAt);
  axios.defaults.headers.common["Authorization"] = authResult.idToken;
};

const getUser = accessToken => {
  return new Promise((resolve, reject) => {
    authService.client.userInfo(accessToken, (err, profile) => {
      if (err) reject(err);
      else {
        resolve(profile);
      }
    });
  });
};

export const handleAuth = nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    return handleAuthentication();
  }
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};
