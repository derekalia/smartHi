//components/registerscene.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

// get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// get internal components
import {LoginAction,LogoffAction} from '../actions';
import Styles from './styles.js';

class RegisterScene extends Component {
    constructor(props) {
        super(props);
        this._userName = null;
        this._userPassword = null;
        this.state = {
            message: 0 
        }
    }

    _enterUserName(name) {
    }

    _enterUserPassword(password) {
    }

    _confirmUserPassword(password) {
    }

    render() {
             return (
                <View style={Styles.container}>
                   <View style={[Styles.container,{flex:3}]}>
                   </View>
                   <View style={[Styles.container,{alignItems: 'center',flex:2}]}>
                        <TextInput style={Styles.input}
                            autoCapitalize  = "none"
                            autoCorrect     = {false}
                            placeholder     = "Enter user name here"
                            returnKeyType   = "next"
                            onEndEditing    = {this._enterUserName.bind(this)}
                        />
                        <TextInput style={Styles.input}
                            password        = {true}
                            autoCapitalize  = "none"
                            autoCorrect     = {false}
                            placeholder     = "Enter password here"
                            onSubmitEditing = {this._enterUserPassword.bind(this)}
                        />
                        <TextInput style={Styles.input}
                            password        = {true}
                            autoCapitalize  = "none"
                            autoCorrect     = {false}
                            placeholder     = "Re-Enter password here"
                            onSubmitEditing = {this._confirmUserPassword.bind(this)}
                        />
                   </View>
                   <View style={[Styles.container,{flex:1}]}>
                        <Text>{this._message}</Text>
                   </View>
                </View>
            );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
// In this example, there is now prop called user that contains state.UserReducer.user section
// Why is it UserReducer???
function mapStateToProps(state) { return {user: state.UserReducer.user} }
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called LoginAction. 
function mapActionToProps(dispatch) {return bindActionCreators({LoginAction,LogoffAction}, dispatch);}

module.exports         = connect(mapStateToProps,mapActionToProps)(RegisterScene);
