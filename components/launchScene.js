//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get internal components

class LaunchScene extends Component {

    _onToRegister() {
        // should call navigator here to move to register page
        this.props.navigator.push(this.props.registerScene);
    }

    _onToLogin() {
        // should call navigator here to move to login page
        this.props.navigator.push(this.props.loginScene);
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={[{ flex: 4, alignItems: 'center' }]}>
                    <Image style={Styles.icon} source={require('../media/Icon.png') }/>
                    <Text style={{ fontFamily: 'Pacifico', fontSize: 52, marginTop: 10 }}>hashtag</Text>
                </View>
                <View style={[Styles.container, { flex: 2 }]}>
                    <TouchableOpacity style={Styles.loginButton} onPress={this._onToLogin.bind(this) }>
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 20 }}> Login </Text>
                    </TouchableOpacity>
                    <Text style={{ color: "black", fontFamily: "Avenir Next", fontSize: 20 }}> or </Text>
                    <TouchableOpacity style={Styles.signUpButton} onPress={this._onToRegister.bind(this) }>
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 20 }}> Register </Text>
                    </TouchableOpacity>
                </View>
                <View style={[Styles.container, { flex: 1 }]}>
                </View>
            </View>
        );
    }
}

module.exports = LaunchScene;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    icon: {
        marginTop: 100,
        height: 246 / 1.7,
        width: 240 / 1.7,
    },



    loginButton: {
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    signUpButton: {
        flex: 1,
        marginHorizontal: 30,
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
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#999999',
    },
    backgroundImage: {
        flex: 1,        
    },
});
