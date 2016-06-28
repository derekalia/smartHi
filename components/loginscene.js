//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get state management components 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components 
import {LoginAction,LogoffAction} from '../actions';
import Styles from './styles.js';

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this._userName = null;
        this._userPassword = null;
        this._message = "";
        this.state = {
            message: 0 
        }
    }

    _enterUserName(event) {
        this._userName = event.nativeEvent.text;
    }

    _enterUserPassword(event) {
        this.props.LoginAction({name:this._userName, password:event.nativeEvent.text});
    }

    render() {
             return (
                <View style={Styles.container}>
                   <View style={[Styles.container,{flex:2}]}>
                   </View>
                   <View style={[Styles.container,{alignItems: 'center'}]}>
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
                   </View>
                   <View style={[Styles.container,{flex:2}]}>
                        <Text>{this.props.userMessage}</Text>
                   </View>
                </View>
            );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
// In this example, there is now prop called user that contains state.UserReducer.user section
// Why is it UserReducer???
function mapStateToProps(state) { return {userMessage: state.UserReducer.message} }
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called LoginAction. 
function mapActionToProps(dispatch) {return bindActionCreators({LoginAction,LogoffAction}, dispatch);}

module.exports         = connect(mapStateToProps,mapActionToProps)(LoginScene);
