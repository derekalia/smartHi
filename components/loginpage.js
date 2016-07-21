//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get internal components
import AboutScene    from './aboutscene.js';
import LaunchScene   from './launchscene.js';
import LoginScene    from './loginscene.js';
import RegisterScene from './registerscene.js';

const LaunchSceneIndex   = 0;
const AboutSceneIndex    = 1;
const LoginSceneIndex    = 3;
const RegisterSceneIndex = 2;

var LoginPageScenes = [
    { title: "Herby", component: LaunchScene, index: LaunchSceneIndex },
    { title: "Herby", component: AboutScene, index: AboutSceneIndex },
    { title: "Herby", component: RegisterScene, index: RegisterSceneIndex },
    { title: "Herby", component: LoginScene, index: LoginSceneIndex },
];

var LoginPageRouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Do something other than "Back" text

        if (index > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13 }}>
                    <Image source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text onPress={navigator.jumpBack} style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
        //  Do make sure to go to the next page if there is one
        var routelist = navigator.getCurrentRoutes();
        if (routelist.length > index + 1) {
            return (
                <Text onPress={navigator.jumpForward} style={{ fontSize: 18, marginTop: 11, color: "#007AFF", marginRight: 13 }}>Forward</Text>
            );
        }
        else {
            return null;
        }

    },
    Title: function (route, navigator, index, navState) {
        return null;
    }
}

class LoginPage extends Component {

    renderScene(route, navigator) {
        if (route.index != LaunchSceneIndex) {
            return (
                <route.component navigator={navigator}/>
            );
        }
        else {
            return (
                <route.component navigator={navigator} loginScene = {LoginPageScenes[LoginSceneIndex]} registerScene = {LoginPageScenes[RegisterSceneIndex]}/>
            );
        }
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FloatFromBottom;
    }
    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {LoginPageScenes[LaunchSceneIndex]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {LoginPageRouteMapper}
                        />
                }
                />
        );
    }
}

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
        height: 52,
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
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
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#999999',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
});

module.exports = LoginPage;
