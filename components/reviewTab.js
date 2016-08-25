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
import {CameraSceneId, ProductInfoSceneId, RateProductSceneId, RateStoreSceneId, ReviewTabId,} from '../common/const.js';

// Import internal modules
import CameraScene        from './cameraScene.js';
import ProductInfoScene   from './productInfoScene.js';
import RateProductScene   from './rateProductScene.js';
import RateStoreScene     from './rateStoreScene.js';

const CameraIndex       = 0;
const ProductInfoIndex  = 1;
const RateProductIndex  = 2;
const RateStoreIndex    = 3;

const TabScenes = [
    { title: "Camera",       component: CameraScene,       index: CameraSceneId },
    { title: "Product Info", component: ProductInfoScene,  index: ProductInfoSceneId },
    { title: "Rate Product", component: RateProductScene,  index: RateProductSceneId },
    { title: "Rate Store",   component: RateStoreScene,    index: RateStoreSceneId },
];

class ReviewTab extends Component {

    constructor(props) {
        super(props);
    } 

    componentWillReceiveProps(nextProps) {
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
            for(var i=0; i < TabScenes.length; i++) {
                 if (TabScenes[i].index == sceneId) {
                    this.refs.navigator.push(TabScenes[i]);
                    break;
                 }
            }
        }
    }

    renderScene(route, navigator) {
        if (route.index == CameraSceneId) {
            return (
                <route.component tabId={ReviewTabId}/>
            );
        }
        else {
            return (
                <View style={{flex:1}}>
                    <route.component tabId={ReviewTabId}/>
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
                initialRoute = {TabScenes[CameraIndex]}
            />
        );
    }
}

function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(ReviewTab);
