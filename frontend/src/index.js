import React from 'react';
import ReactDOM from 'react-dom';

import "./styles/index.scss";

// We will create this component shortly
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import {fetchPanels} from './actions/panel_actions'
import { createComment, deleteComment } from './actions/comment_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  const devState = {
  }
  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    devState.session = { isAuthenticated: true, user: decodedUser }
    const preloadedState = devState;

    // const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/#/splash';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore(devState);
  }
  window.store = store;
  window.fetchPanels = fetchPanels;
  window.createComment = createComment;
  window.deleteComment = deleteComment;
  // Render our root component and pass in the store as a prop

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});