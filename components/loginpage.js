//
// Description: loginpage.js
// This contains the declaration for the login and registration of the app
// It should only contain logic to manipulate login scenes
// 

// Import modules
import React, { Component } from 'react';
import {Navigator, } from 'react-native';

// Import const ids. 
import {LoginSceneId,RegisterSceneId,LaunchSceneId} from '../common/const.js';

//get internal components
import LaunchScene   from './launchScene.js';
import LoginScene    from './loginScene.js';
import RegisterScene from './registerScene.js';
import RouteMapper   from './routeMapper.js';

//
// BatsFix. It appears javascript doesnt have true map set so we have to
// define indexes here manually
//
const LaunchIndex   = 0;
const LoginIndex    = 1;
const RegisterIndex = 2;

const LoginPageScenes = [
      { title: "Herby", component: LaunchScene,   index: LaunchSceneId },
      { title: "Herby", component: LoginScene,    index: LoginSceneId },
      { title: "Herby", component: RegisterScene, index: RegisterSceneId },
];

class LoginPage extends Component {

    renderScene(route, navigator) {
        if (route.index != LaunchSceneId) {
            return (
                <route.component navigator={navigator}/>
            );
        }
        else {
            return (
                <route.component navigator={navigator} loginScene = {LoginPageScenes[LoginIndex]} registerScene = {LoginPageScenes[RegisterIndex]}/>
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
                initialRoute = {LoginPageScenes[LaunchIndex]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {RouteMapper}
                        />
                }
                />
        );
    }
}

module.exports = LoginPage;
