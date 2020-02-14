import React from 'react';
import { Link, NavLink } from 'react-router-dom';;

const NavBar = (props) => {
    const handleHamburger = () => {
        props.toggleModal("nav-dropdown");
    }
    return(
        <div className="nav-bar">
            <div>   
                <Link to="/">
                    <img className="logo" src="logo512.png" alt="offshoot logo" />
                </Link>
            </div>
            <div className={props.currentModal === "nav-dropdown" ? "dropdown-container open" : "dropdown-container"}>
                <i className="material-icons dropdown-button" onClick={handleHamburger}>menu</i>
                <div className="dropdown">
                    <div className="dropdown-backdrop" onClick={handleHamburger}></div>
                    <div className="user-links">
                            {props.authStatus ?
                            <div>
                                    <NavLink to={`/users/${props.currentUser.id}`}>
                                    <span className="username">
                                        <img className="acorn-icon" src="acorn-icon-black.png" alt="acorn icon"></img>
                                        <span>{props.currentUser.username}</span>
                                    </span>
                                    </NavLink>

                            </div>
                            :
                            <div className="auth-links">

                                <span className="guestname">Browsing as guest.</span>
                                <div>
                                    <NavLink to="/login">Sign In</NavLink>
                                </div>
                                <div>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </div>
                            </div>
                            }
                    </div>
                    {props.authStatus ?
                    <div className="story-links">
                        <div>
                            <NavLink to={`/users/${props.currentUser.id}`}>My Shoots Link</NavLink>
                        </div>
                        <div>
                            <NavLink to={`/panels/liked`}>Liked Roots</NavLink>
                        </div>
                        <div>
                            <NavLink to={`/roots/new`}>New Story Link</NavLink>
                        </div>
                    </div> :
                    "" }
                    {props.authStatus ?
                        <div className="auth-links">
                                <button onClick={props.logout}>
                                    Sign Out
                                </button>
                        </div>
                    :
                    ""}
                </div>
              </div>
            </div>
        );
}
export default NavBar;
