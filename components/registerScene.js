//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {RegisterAction} from '../actions';


class LoginScene extends Component {
    constructor(props) {
        super(props);
        this._userName = "";
        this._userPassword = "";
        this._userPassword2 = "";
        this.state = { showMessage: false };
    }

    _hideMessage() {
        if (this.state.showMessage == true) {
            this._message = "";
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

    _confirmUserPassword(event) {
        this._hideMessage();
        this._userPassword2 = event.nativeEvent.text;
    }

    _submit() {
        this.setState({ showMessage: true });
        this.props.RegisterAction({ name: this._userName, password: this._userPassword, password2: this._userPassword2 });
    }

    render() {
        return (
            <View>
                <View style={[{ flex: 1, alignItems: 'center', marginTop: 20 }]}>
                    <Image style={Styles.icon} source={require('../media/Icon.png') }/>
                    <Text style={{ fontFamily: 'Pacifico', fontSize: 38, marginTop: 10 }}>Weedly</Text>
                </View>


                <View style={{flex:1,alignItems: 'center',marginTop:10, }}>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Email"
                        returnKeyType   = "next"
                        onChange        = {this._enterUserName.bind(this) }
                        />
                    <View style={{ alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 30, height: 30 }} source={require("../media/mailicon1.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center" }}/>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center",marginTop:10 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Username"
                        returnKeyType   = "next"
                        onChange        = {this._enterUserName.bind(this) }
                        />
                    <View style={{ alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 30, height: 30 }} source={require("../media/mailicon1.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center" }}/>


                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center",marginTop: 10 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        password        = {true}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Password"
                        onChange        = {this._enterUserPassword.bind(this) }
                        />
                    <View style={{alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 32, height: 30 }} source={require("../media/passwordIcon.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center" }}/>



                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", marginTop: 10 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        password        = {true}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Comfirm Password"
                        onChange        = {this._confirmUserPassword.bind(this) }
                        />
                    <View style={{  alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 32, height: 30 }} source={require("../media/passwordIcon.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center",  }}/>


                  <View style={{height:50,marginTop:10,}}>
                    <TouchableOpacity style={Styles.loginButton}
                        onPress = {this._submit.bind(this) }
                        >
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 20 }}> Register </Text>
                    </TouchableOpacity>
                    </View>

                    <Text>{this.state.showMessage ? this.props.userMessage : ""}</Text>

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

    loginButton: {
        height: 60,
        width:290,
        marginTop:20,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent:'center'
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
// In this example, there is now prop called RegisterAction.
function mapActionToProps(dispatch) { return bindActionCreators({ RegisterAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(LoginScene);
