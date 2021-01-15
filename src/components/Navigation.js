import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render(){
        return(
            <nav className="main-nav" onClick={this.onNavChange} >
            <ul>
                <li><NavLink to='/cats'>Cats</NavLink></li>
                <li><NavLink to='/dogs'>Dogs</NavLink></li>
                <li><NavLink to='/computers'>Computers</NavLink></li>
            </ul>
            </nav>
        )
    }
}

export default Navigation;
