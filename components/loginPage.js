//
// Description: loginpage.js
// This contains the declaration for the login and registration of the app
// It should only contain logic to manipulate login scenes
//

// Import modules
import React, { Component } from 'react';
import {Navigator,View } from 'react-native';

// Import const ids.
import {LoginSceneId,RegisterSceneId,LaunchSceneId, onBoardingOneId,onBoardingTwoId,onBoardingThreeId} from '../common/const.js';


//get internal components
import LaunchScene   from './scenes/launch/launchScene.js';
import LoginScene    from './scenes/login/loginScene.js';
import RegisterScene from './scenes/register/registerScene.js';
import onBoardingOne from './scenes/onBording/onBoardingOne.js';
import onBoardingTwo from './scenes/onBording/onBoardingTwo.js';
import onBoardingThree from './scenes/onBording/onBoardingThree.js';
import RouteMapper   from './util/routeMapper.js';

//
// BatsFix. It appears javascript doesnt have true map set so we have to
// define indexes here manually
//
const LaunchIndex   = 0;
const LoginIndex    = 1;
const RegisterIndex = 2;
const onBoardingOneIndex  = 3;
const onBoardingTwoIndex  = 4;
const onBoardingThreeIndex  = 5;

const LoginPageScenes = [
      { title: "Herby", component: LaunchScene,   index: LaunchSceneId },
      { title: "Herby", component: LoginScene,    index: LoginSceneId },
      { title: "Herby", component: RegisterScene, index: RegisterSceneId },
      { title: "Herby", component: onBoardingOne, index: onBoardingOneId },
      { title: "Herby", component: onBoardingTwo, index: onBoardingTwoId },
      { title: "Herby", component: onBoardingThree, index: onBoardingThreeId },

];

class LoginPage extends Component {

    renderScene(route, navigator) {
                return (
                <route.component navigator={navigator}
                  loginScene = {LoginPageScenes[LoginIndex]}
                  launchScene = {LoginPageScenes[LaunchIndex]}
                  registerScene = {LoginPageScenes[RegisterIndex]}
                  onBoardingOne = {LoginPageScenes[onBoardingOneIndex]}
                  onBoardingTwo = {LoginPageScenes[onBoardingTwoIndex]}
                  onBoardingThree = {LoginPageScenes[onBoardingThreeIndex]}/>
            );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FloatFromRight;
    }
    render() {

        return (
            <View style={{flex:1}}>
            <Navigator
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {LoginPageScenes[onBoardingOneIndex]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {RouteMapper}
                        />
                }
                />
            </View>
        );
    }
}

module.exports = LoginPage;
