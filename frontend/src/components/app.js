import React from 'react';
import styled,{ ThemeProvider } from 'styled-components';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/nav_bar_container';
import Register from './session/signup_form';
import Login from './session/login_form';
import PanelShow from './panel/show/panel_show';
import createPanelContainer from './main/panel/createPanelContainer';
import branchPanelContainer from './main/panel/branchPanelContainer';
import editPanelContainer from './main/panel/editPanelContainer';
import LikedIndexContainer from './main/index/liked_index_container';
import MainIndexContainer from './main/index/main_Index_container';
import UserProfile from './main/profile/user_profile';
import { theme } from '../styles/theme'

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
      <Route exact path="/" component={MainIndexContainer} />
      <ProtectedRoute exact path='/panels/liked' component={LikedIndexContainer} />
      <ProtectedRoute exact path='/users/:userId' component={UserProfile} />
      <ProtectedRoute exact path="/roots/new" component={createPanelContainer} />
      <ProtectedRoute path="/panels/:panelId/branch" component={branchPanelContainer} />
      <ProtectedRoute path="/panels/:panelId/edit" component={editPanelContainer} />
      <ProtectedRoute path="/panels/:panelId" component={PanelShow} />
    </Switch>
    </AppStyle>
  </ThemeProvider>
);

export default App;