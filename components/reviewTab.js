//
// Description: hometab.js
// This contains the declaration for the home tab  of the app
// It should only contain home tab scene navigation logic and nothing else.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, Navigator } from 'react-native';
import {connect} from 'react-redux';
// Import const ids.
import {CameraSceneId, ProductInfoId, RateProductId, RateStoreId, ReviewTabId,} from '../common/const.js';

// Import internal modules
import CameraScene        from './cameraScene.js';
import ProductInfoScene   from './productInfoScene.js';
import RateProductScene   from './rateProductScene.js';
import RateStoreScene     from './rateStoreScene.js';

const CameraIndex       = 0;
const ProductInfoIndex  = 1;
const RateProductIndex  = 2;
const RateStoreIndex    = 3;

const ReviewTabScenes = [
    { title: "Camera",       component: CameraScene,       index: CameraSceneId },
    { title: "Product Info", component: ProductInfoScene,  index: ProductInfoId },
    { title: "Rate Product", component: RateProductScene,  index: RateProductId },
    { title: "Rate Store",   component: RateStoreScene,    index: RateStoreId },
];

var RouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Styling should be moved to common
        if (index > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13, }}>
                    <Image source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text onPress={navigator.jumpBack} style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
        if (index < (ReviewTabScenes.length - 1)) {
            // BatsFix. Add a check here if the next scene is enabled.
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginRight: 13, }}>
                    <Text onPress={navigator.jumpForward} style={{ fontSize: 18, color: "#007AFF" }}> Next</Text>
                </View>
            );
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


class ReviewTab extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTab == ReviewTabId) {
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
    }

    renderScene(route, navigator) {
        return (
            <route.component tabId={ReviewTabId} navigator={navigator}/>
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
                initialRoute = {ReviewTabScenes[CameraIndex]}
                initialRouteStack = {ReviewTabScenes}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {RouteMapper}
                        style={{backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}} >
                    </Navigator.NavigationBar>
                }
            />
        );
    }
}

function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(ReviewTab);
