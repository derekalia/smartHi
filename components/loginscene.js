//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {LoginAction, LogoffAction} from '../actions';


class LoginScene extends Component {
    constructor(props) {
        super(props);
        this._userName = "";
        this._userPassword = "";
        this.state = { showMessage: false };
    }

    _hideMessage() {
        if (this.state.showMessage == true) {
            this.setState({ showMessage: false });
        }
    }

    _enterUserName(event) {
        this._hideMessage();
        this._userName = event.nativeEvent.text;
    }

    _enterUserPassword(event) {
        this._hideMessage();
        this._userPassword = event.nativeEvent.text
    }

    _submit() {
        this.setState({ showMessage: true });
        this.props.LoginAction({ name: this._userName, password: this._userPassword });
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={[{ flex: 2, alignItems: 'center', marginTop: 50 }]}>
                    <Image style={Styles.icon} source={require('../media/Icon.png') }/>
                    <Text style={{ fontFamily: 'Pacifico', fontSize: 38, marginTop: 10 }}>Weedly</Text>
                </View>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", justifyContent: "center", marginLeft: 40 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Email"
                        returnKeyType   = "next"
                        onChange        = {this._enterUserName.bind(this) }
                        />
                    <View style={{ flex: 1, alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 30, height: 30 }} source={require("../media/mailicon1.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 280, alignItems: 'center', alignItems: "center", justifyContent: "center", left: 44 }}/>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", justifyContent: "center", marginLeft: 40, marginTop: 25 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        password        = {true}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Password"
                        onChange        = {this._enterUserPassword.bind(this) }
                        />
                    <View style={{ flex: 1, alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 32, height: 30 }} source={require("../media/passwordIcon.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 280, alignItems: 'center', alignItems: "center", justifyContent: "center", left: 44 }}/>

                <View style={[Styles.container]}>
                    <TouchableOpacity style={Styles.loginButton} onPress={this._submit.bind(this) }>
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 20 }}> Login </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: "red", fontSize: 16, justifyContent: "center" }}>{this.state.showMessage ? this.props.userMessage : ""}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    icon: {
        marginTop: 70,
        height: 246 / 2.7,
        width: 240 / 2.7,
    },

    separator: {
        height: 2,
        backgroundColor: '#dddddd'
    },

    loginButton: {
        flex: 1,
        height: 40,
        marginHorizontal: 44,
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    signUpButton: {
        flex: 1,
        height: 52,
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: '#50E3C2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonSmall: {
        flex: 1,
        marginHorizontal: 3,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 30,
        fontSize: 10,
        marginHorizontal: 10,
        textAlign: 'left',
        margin: 10,
        backgroundColor: 'white',

    },
});


// BatsFix. This function is used to convert state to props passed to this component
// In this example, there is now prop called user that contains state.UserReducer.user section
// Why is it UserReducer???
function mapStateToProps(state) { return { userMessage: state.UserReducer.message } }
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called LoginAction.
function mapActionToProps(dispatch) { return bindActionCreators({ LoginAction, LogoffAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(LoginScene);
