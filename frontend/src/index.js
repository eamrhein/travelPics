import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

document.addEventListener('DOMContentLoaded', () => {
  let store;
  const devState = {};
  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    devState.session = { isAuthenticated: true, user: decodedUser };
    const preloadedState = devState;

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/#/';
    }
  } else {
    store = configureStore(devState);
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});

serviceWorker.register();
