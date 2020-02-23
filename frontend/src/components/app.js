import React, { lazy, Suspense } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch, Redirect } from 'react-router-dom';
import { theme, Main, Container } from '../styles/theme';
import IndexContainer from './panel_index/conditional_Index';
const UserProfile = lazy(() => import('./panel_index/user_profile'));
const editPanelContainer = lazy(() => import('./panel_form/editPanelContainer'));
const branchPanelContainer = lazy(() => import('./panel_form/branchPanelContainer'));
const createPanelContainer = lazy(() => import('./panel_form/createPanelContainer'));
const PanelShow = lazy(() => import('./panel_show/show/panel_show'));
const Login = lazy(() => import('./session/login_form'));
const NavBarContainer = lazy(() => import('./nav/nav_bar_container'));
const Register = lazy(() => import('./session/signup_form'));

const AppStyle = styled.div`
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.font};
  }
  a:visited {
    color: ${props => props.theme.colors.font};
  }
  background-color: ${props => props.theme.colors.background};
  height: 100vh;
  overflow: hidden;
  flex-flow: column;
  align-items: center;
  flex-grow: 1;
  display: flex;
  font-size: calc(9pt + 0.5vmin);
  color: ${props => props.theme.colors.font};
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <AppStyle>
      <Suspense fallback={<div> </div>}>
        <NavBarContainer />
        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Register} />
          <Route
            exact
            path="/"
            component={props => (
              <Container>
                <Main>
                  <IndexContainer {...props} />
                </Main>
              </Container>
            )}
          />
          <ProtectedRoute
            exact
            path="/panels/liked"
            component={props => (
              <Container>
                <Main>
                  <UserProfile {...props} type="liked" />
                </Main>
              </Container>
            )}
          />
          <Route
            exact
            path="/users/:userId"
            component={props => (
              <Container>
                <Main>
                  <UserProfile {...props} type="user" />
                </Main>
              </Container>
            )}
          />
          <ProtectedRoute exact path="/roots/new" component={createPanelContainer} />
          <ProtectedRoute path="/panels/:panelId/branch" component={branchPanelContainer} />
          <ProtectedRoute path="/panels/:panelId/edit" component={editPanelContainer} />
          <Route path="/panels/:panelId" component={PanelShow} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </AppStyle>
  </ThemeProvider>
);

export default App;
