//
// Description: herby.js
// Entry point for the app. App consists of 2 main pages, LoginPage
// which handles login logistics and MainPage which contains all other 
// scenes/scenarios. 
// 

import React, { Component } from 'react';
import {connect} from 'react-redux';

import LoginPage from './loginpage.js';
import MainPage  from './mainpage.js';

class Herby extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        isUserLoggedIn = this.props.userLoggedIn;
        if (isUserLoggedIn == false) {
            //return (<LoginPage/>);
            return (<MainPage/>);
        }
        else {
            return (<MainPage/>);
        }
    }
}

// 
// map state.UserReducer.user.loggedIn as a prop
//
function mapStateToProps(state) { return { userLoggedIn: state.UserReducer.user.loggedIn } }

module.exports = connect(mapStateToProps)(Herby);
