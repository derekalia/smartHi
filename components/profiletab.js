//
// Description: profiletab.js
// This contains the declaration for the profile tab  of the app.
// It should only contain profile scenes navigation.
// BatsFix. We are using this as a test tab for now!!!
// Follow TestScene sample for an example of how to test a scene.
// 

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Navigator, Image } from 'react-native';
import {Connect} from 'react-redux';

// Import internal modules
import TestScene     from './testScene.js';
import ProfileScene  from './profileScene.js';
import TestProduct  from './testProduct.js';

// Import const ids. 

const ReviewTabScenes = [ 
    { title: "Test",         component: TestScene,    index: 0 },
    { title: "ProfileTest",  component: ProfileScene, index: 1 },
    { title: "ProductTest",  component: TestProduct, index: 2 },
];

var TestRouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Styling should be moved to common
        if (index > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13 }}>
                    <Text onPress={navigator.jumpBack} style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginRight: 13 }}>
                    <Text onPress={navigator.jumpForward} style={{ fontSize: 18, color: "#007AFF" }}> Forward</Text>
                </View>
            );
        },


    Title: function (route, navigator, index, navState) {
        return (
            <Text style={{ fontSize: 18, marginTop: 11, fontWeight: 'bold' }}>
                {route.title}
            </Text>
        );
    }
}



class ReviewTab extends Component {

    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator} title={route.title}/>
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
                initialRoute = {ReviewTabScenes[0]}
                initialRouteStack = {ReviewTabScenes}
                navigationBar={
                    <Navigator.NavigationBar 
                        routeMapper = {TestRouteMapper}
                        >
                    </Navigator.NavigationBar>
                }
                />
        );
    }
}

module.exports = ReviewTab;
