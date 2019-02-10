import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/game">
                <h1>
                    <span className="circle"></span>
                    Four in <br />
                    a Row</h1>
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/game" exact activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active">About</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
