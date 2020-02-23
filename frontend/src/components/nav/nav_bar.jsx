import React from 'react';
import { Link } from 'react-router-dom';
import { GiCampfire } from 'react-icons/gi';
import { Nav, NavItems } from '../../styles/theme';
import styled from 'styled-components';
const Logo = styled.span`
  font-weight: bolder;
  color: ${props => props.theme.colors.primary};
`;
const NavBar = props => {
  return (
    <Nav>
      <NavItems>
        <li className="logo">
          <Link to="/">
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
              <Logo>
                <GiCampfire style={{ marginTop: '4px' }} />
              </Logo>
              Travel<Logo>Story</Logo>
            </h1>
          </Link>
        </li>
        {props.authStatus ? null : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {props.authStatus ? (
          <>
            <li>
              <Link to={`/users/${props.currentUser.id}`}>My Trips</Link>
            </li>
            <li>
              <Link to={`/panels/liked`}>Followed Trips</Link>
            </li>
            <li>
              <Link to={`/roots/new`}>Create New Trip</Link>
            </li>
            <li>
              <button onClick={props.logout}>Sign Out</button>
            </li>
          </>
        ) : null}
      </NavItems>
    </Nav>
  );
};
export default NavBar;
