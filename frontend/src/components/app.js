import React from 'react';
import styled,{ ThemeProvider } from 'styled-components';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/nav_bar_container';
import Register from './session/signup_form';
import Login from './session/login_form';
import PanelShow from './panel_show/show/panel_show';
import createPanelContainer from './panel_form/createPanelContainer';
import branchPanelContainer from './panel_form/branchPanelContainer';
import editPanelContainer from './panel_form/editPanelContainer';
import IndexContainer from './panel_index/conditional_Index';
import UserProfile from './panel_index/user_profile';
import { theme, Main, Container } from '../styles/theme'

const AppStyle = styled.div`
    a {
        text-decoration: none;
        color:${props => props.theme.colors.font};
    } 
    a:visited {
        color:${props => props.theme.colors.font};
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
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path='/login' component={Login} />
      <AuthRoute exact path='/signup' component={Register} />
      <Route exact path="/" component={(props) => (
        <Container>
          <Main>
            <IndexContainer {...props} />
          </Main>
        </Container>
      )}
      />
      <ProtectedRoute exact path='/panels/liked' component={(props) => (
        <Container>
          <Main>
            <IndexContainer {...props} />
          </Main>
        </Container>
      )} />
       <ProtectedRoute exact path='/users/:userId' component={(props) => (
        <Container>
          <Main>
            <UserProfile {...props} />
          </Main>
        </Container>
        )
      } />
      <ProtectedRoute exact path="/roots/new" component={createPanelContainer} />
      <ProtectedRoute path="/panels/:panelId/branch" component={branchPanelContainer} />
      <ProtectedRoute path="/panels/:panelId/edit" component={editPanelContainer} />
      <ProtectedRoute path="/panels/:panelId" component={PanelShow} />
    </Switch>
    </AppStyle>
  </ThemeProvider>
);

export default App;