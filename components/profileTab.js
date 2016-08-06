//
// Description: profiletab.js
// This contains the declaration for the profile tab  of the app.
// It should only contain profile scenes navigation.
// BatsFix. We are using this as a test tab for now!!!
// Follow TestScene sample for an example of how to test a scene.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Navigator, Image,TouchableHighlight } from 'react-native';
import {Connect} from 'react-redux';

/// Import const ids.
import {ProfileTabId,} from '../common/const.js';

// Import internal modules
import ProfileScene      from './profileScene.js';
import TestScene         from './testScene.js';
import SettingScene      from './settingScene.js';
import LicenseeAuthScene from './licenseeAuthScene.js';
import TestScene2        from './testScene2.js';

// Import const ids.

const ProfileTabScenes = [
    { title: "Profile",           component: ProfileScene,      index: 1 },
    { title: "SettingScene",      component: SettingScene,      index: 2 },
    { title: "LicenseeAuthScene", component: LicenseeAuthScene, index: 3 },
    { title: "TestScene",         component: TestScene,         index: 4 },
    { title: "TestScene2",        component: TestScene2,        index: 5 },
];

var TestRouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Styling should be moved to common
        if(index == 0){
          return (
              <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13 }}>
                  <Text onPress={ ()=>navigator.jumpTo(ProfileTabScenes[4])} style={{ fontSize: 18, color: "#007AFF" }}>TestBed</Text>
              </View>
          );
        }
        if(index >0){
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13 }}>
                    <Text onPress={navigator.jumpBack} style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
        if (index < (ProfileTabScenes.length - 1)) {
            // BatsFix. If at index 1, then go to index 3 not index 2 when going next
            if (index == 1) {
                return (
                    <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginRight: 13, }}>
                        <Text onPress={navigator.jumpForward} style={{ fontSize: 18, color: "#007AFF" }}> Skipping</Text>
                    </View>
                );
            }
            if (index == 0) {
                return (
                    <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginRight: 13, }}>
                        <Text onPress={navigator.jumpForward} style={{ fontSize: 18, color: "#007AFF" }}> Settings</Text>
                    </View>
                );
            }
            else {
                return (
                    <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginRight: 13, }}>
                        <Text onPress={navigator.jumpForward} style={{ fontSize: 18, color: "#007AFF" }}> Next </Text>
                    </View>
                );
            }
        }
    },

    Title: function (route, navigator, index, navState) {
        return (
            <Text style={{ fontSize: 18, marginTop: 11, fontWeight: 'bold' }}>
                {route.title}
            </Text>
        );
    }
}

class ProfileTab extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedTab:ProfileTabId, resetScene: 0 };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.resetScene == nextProps.resetScene) {
            var sceneId = nextProps.sceneId;
            var foundExisting = false;
            // Check existing routes first
            var routelist = this.refs.navigator.getCurrentRoutes();
            for (var i=0; i < routelist.length; i++) {
                if (routelist[i].index == sceneId) {
                    this.refs.navigator.jumpTo(routelist[i]);
                    foundExisting = true;
                    break;
                }
            }
            // If not found in existing push
            if (foundExisting == false) {
                for(var i=0; i < ReviewTabScenes.length; i++) {
                     if (ReviewTabScenes[i].index == sceneId) {
                        this.refs.navigator.push(ReviewTabScenes[i]);
                     }
                }
            }
        }
        else {
            this.setState({resetScene: nextProps.resetScene});
            this.refs.navigator.popToTop();
        }
    }

    renderScene(route, navigator) {
        return (
            <route.component tabId={ProfileTabId} navigator={navigator} title={route.title}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {ProfileTabScenes[0]}
                initialRouteStack = {ProfileTabScenes}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {TestRouteMapper}
                        style={{backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}} >
                    </Navigator.NavigationBar>
                }
                />
        );
    }
}

module.exports = ProfileTab;
