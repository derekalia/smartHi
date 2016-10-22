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

    _onToOnBoard() {
        // should call navigator here to move to login page
        this.props.navigator.push(this.props.onBoardingOne);
    }


    render() {
        return (
            <View style={Styles.container}>
                <View style={[{ flex: 4, alignItems: 'center' }]}>
                    <Image style={Styles.icon} source={require('../../../media/smartHi_splash1.png') }/>
                    {/* <Text style={{ fontFamily: 'Dosis-SemiBold', fontSize: 52, marginTop: 10 }}>smartHi</Text> */}
                </View>
                <View style={[Styles.container, { flex: 1 }]}>
                    <TouchableOpacity style={Styles.loginButton} onPress={this._onToLogin.bind(this) }>
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 18 }}> LOGIN </Text>
                    </TouchableOpacity>
                    <Text style={{ color: "black", fontFamily: "Avenir Next", fontSize: 20 }}>  </Text>
                    <TouchableOpacity style={Styles.signUpButton} onPress={this._onToRegister.bind(this) }>
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 18 }}> REGISTER </Text>
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
        height: 260 ,
        width: 300,
    },



    loginButton: {

        height:60,
        marginHorizontal: 80,
        borderRadius: 40,
        backgroundColor: '#15B4F1',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    signUpButton: {

        height:60,
        marginHorizontal: 80,
        borderRadius: 40,
        backgroundColor: '#A3DE00',
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
