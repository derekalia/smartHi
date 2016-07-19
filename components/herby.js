//components/loginpage.js
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Navigator,
}
from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {LoginAction, LogoffAction} from '../actions';

import LoginPage from './loginpage.js';
import MainPage  from './mainpage.js';
import Styles from './styles.js';

class Herby extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        isUserLoggedIn = this.props.userLoggedIn;
        if (isUserLoggedIn == false) {
            return (<LoginPage/>);
        }
        else {
            return (<MainPage/>);
        }
    }
}

// BatsFix. This function is used to convert state to props passed to this component
// In this example, there is now prop called user that contains state.UserReducer.user section
// Why is it UserReducer??? ReactNative will call render only if the prop reference changes.
// Therefore, cannot use complex prop (in this case user) because if only user's user.loggedIn state
// changed it will not trip render action! Could be a case of shallow comparison. Or could be a
// bug in redux/redux-native/react-native!!!!!

function mapStateToProps(state) { return { userLoggedIn: state.UserReducer.user.loggedIn } }
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called LoginAction. 

module.exports = connect(mapStateToProps)(Herby);
