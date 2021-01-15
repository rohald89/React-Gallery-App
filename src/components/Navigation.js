import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render(){
        return(
            <nav className="main-nav" onClick={this.onNavChange} >
            <ul>
                <li><NavLink to='/autumn'>Autumn</NavLink></li>
                <li><NavLink to='/winter'>Winter</NavLink></li>
                <li><NavLink to='/spring'>Spring</NavLink></li>
                <li><NavLink to='/summer'>Summer</NavLink></li>
            </ul>
            </nav>
        )
    }
}

export default Navigation;
