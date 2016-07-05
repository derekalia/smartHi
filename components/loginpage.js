//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get internal components
import LoginScene    from './loginscene.js';
import RegisterScene from './registerscene.js';






class LaunchScene extends Component {

    _onToRegister() {
        // should call navigator here to move to register page
        this.props.navigator.push(LoginPageScenes[RegisterSceneIndex]);
    }

    _onToLogin() {
        // should call navigator here to move to login page
        this.props.navigator.push(LoginPageScenes[LoginSceneIndex]);
    }

    render() {
            return (
                <View style={Styles.container}>
                   <View style={[{flex:10, alignItems: 'center'}]}>
                     <Image style={Styles.icon} source={require('../media/Icon.png')}/>
                     <Text style={{fontFamily: 'Pacifico', fontSize: 52, marginTop:10}}>Weedly</Text>
                   </View>

                   <View style={[Styles.container,{flex:1}]}>
                         <TouchableOpacity style={Styles.loginButton} onPress={this._onToLogin.bind(this)}>
                            <Text style={{color:"white", fontFamily:"Avenir Next",fontSize:20}}> Login </Text>
                        </TouchableOpacity>
                        <Text style={{color:"black", fontFamily:"Avenir Next",fontSize:20}}> or </Text>
                        <TouchableOpacity style={Styles.signUpButton} onPress={this._onToRegister.bind(this)}>
                            <Text style={{color:"white", fontFamily:"Avenir Next",fontSize:20}}> Register </Text>
                        </TouchableOpacity>
                   </View>
                   <View style={[Styles.container,{flex:2}]}>
                   </View>
                </View>
            );
    }
}

class AboutScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                   <View style={[Styles.container,{flex:2}]}>
                   </View>
                   <View style={[Styles.container,{alignItems: 'center',flex:1}]}>
                        <Text> This is where text about the app should go </Text>
                  </View>
                   <View style={[Styles.container,{flex:2}]}>
                   </View>
                </View>
            );
    }
}

const LaunchSceneIndex   = 0;
const AboutSceneIndex    = 1;
const LoginSceneIndex    = 3;
const RegisterSceneIndex = 2;

var LoginPageScenes = [
    {title: "Herby",    component: LaunchScene,   index: LaunchSceneIndex},
    {title: "Herby",    component: AboutScene,    index: AboutSceneIndex},
    {title: "Herby",    component: RegisterScene, index: RegisterSceneIndex},
    {title: "Herby",    component: LoginScene,    index: LoginSceneIndex},
];

var LoginPageRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        // BatsFix. Do something other than "Back" text
        if (index > 0) {
            return (
                <Text onPress={navigator.jumpBack}>Back</Text>
            );
        }
    },
    RightButton: function(route, navigator, index, navState) {
        return null;
    },
    Title: function(route, navigator, index, navState) {
        if (route.index == AboutSceneIndex) {
            return (
                <Text style={Styles.header}>
                      {route.title}
                </Text>
            );
        }
        return (
            <Text style={Styles.header}
                  onPress={()=> navigator.push(LoginPageScenes[AboutSceneIndex])}>
                  {route.title}
            </Text>
        );
    }
}

class LoginPage extends Component {

    renderScene(route, navigator) {
        if (route.index == RegisterSceneIndex || route.index == LoginSceneIndex) {
            return (
                <route.component navigator={navigator}/>
            );
        }
        else {
            return (
                <route.component navigator={navigator}/>
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
        marginTop:100,
        height:246/1.7,
        width:240/1.7,
    },

    loginButton: {
        flex: 1,
        height:52,
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
        height:52,
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
