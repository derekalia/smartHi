//
// Description: profiletab.js
// This contains the declaration for the profile tab  of the app.
// It should only contain profile scenes navigation.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Navigator, Image,TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';

/// Import const ids.
import {ProfileTabId,ProfileSceneId,SettingsSceneId,LicenseeSceneId,LicenseeStoreSceneId,LicenseeProductSceneId,} from '../common/const.js';

// Import internal modules
import ProfileScene         from './profileScene.js';
import SettingsScene        from './settingsScene.js';
import LicenseeScene        from './licenseeScene.js';
import LicenseeStoreScene   from './licenseeStoreScene.js';
import LicenseeProductScene from './licenseeProductScene.js';


// Import const ids.

const TabScenes = [
    { title: "Profile",        component: ProfileScene,         index: ProfileSceneId },
    { title: "Settings",       component: SettingsScene,        index: SettingsSceneId },
    { title: "Licensee",       component: LicenseeScene,        index: LicenseeSceneId },
    { title: "Store Info",     component: LicenseeStoreScene,   index: LicenseeStoreSceneId },
    { title: "Product Info",   component: LicenseeProductScene, index: LicenseeProductSceneId },
];

class ProfileTab extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.tabId != ProfileTabId) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.sceneId;

        // Check if need to reset tab.
        if (sceneId == ProfileSceneId) {
            // reset scenes.
            this.refs.navigator.popToTop();
            return;
        }

        // Otherwise it is a scene change 
        // Check existing routes first
        var foundExisting = false;

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
            for(var i=0; i < TabScenes.length; i++) {
                 if (TabScenes[i].index == sceneId) {
                    this.refs.navigator.push(TabScenes[i]);
                    break;
                 }
            }
        }
    }

    renderScene(route, navigator) {
        if (route.index == ProfileSceneId) {
            return (
                <route.component tabId={ProfileTabId}/>
            );
        }
        else {
            return (
                <View style={{flex:1}}>
                    <route.component tabId={ProfileTabId}/>
                </View>
            );
        }
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
                initialRoute = {TabScenes[0]}
                />
        );
    }
}
function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(ProfileTab);
