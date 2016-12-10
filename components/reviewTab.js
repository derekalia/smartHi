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
import {CameraSceneId, ProductInfoSceneId, RateProductSceneId, RateRetailerSceneId,RateQueueSceneId,ReviewTabId} from '../common/const.js';

// Import internal modules
import CameraScene        from './scenes/camera/cameraScene.js';
import ProductInfoScene   from './scenes/productInfo/productInfoScene.js';
import RateProductScene   from './scenes/rateProduct/rateProductScene.js';
import RateRetailerScene  from './scenes/rateRetailer/rateRetailerScene.js';
import RateQueueScene     from './scenes/rateQueue/rateQueueScene.js';

import {HerbyBar}         from '../common/controls.js';

const CameraIndex       = 0;
const ProductInfoIndex  = 1;
const RateProductIndex  = 2;
const RateRetailerIndex = 3;
const RateQueueIndex    = 4;

const TabScenes = [
    { title: "Camera",       component: CameraScene,       index: CameraSceneId },
    { title: "Product Info", component: ProductInfoScene,  index: ProductInfoSceneId },
    { title: "Rate Product", component: RateProductScene,  index: RateProductSceneId },
    { title: "Rate Store",   component: RateRetailerScene, index: RateRetailerSceneId },
    { title: "Rate Queue",   component: RateQueueScene,    index: RateQueueSceneId },
];

class ReviewTab extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.tabId != ReviewTabId) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.scene.sceneId;
        if (nextProps.tabId != ReviewTabId) {
            return;
        }

        // Check if need to reset tab.
        if (sceneId == CameraSceneId) {
            // reset scenes.
            this.refs.navigator.popToTop();
            return;
        }

        // If not found in existing push
        for(var i=0; i < TabScenes.length; i++) {
             if (TabScenes[i].index == sceneId) {
                // BatsFix. Currently push scenes as they come along
                // Later probably need to throttle that
                var currentScene = Object.assign({}, TabScenes[i]);
                currentScene.itemId = nextProps.itemId;
                this.refs.navigator.push(currentScene);
                break;
             }
        }
    }

    renderScene(route, navigator) {
        return (
                <route.component tabId={ReviewTabId} navigator={navigator} currentUser={navigator.props.currentUser} itemId={route.itemId}/>
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
                initialRoute = {TabScenes[CameraIndex]}
                currentUser  = {this.props.user}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tabId: state.NavigationReducer.tabId,
        scene: state.NavigationReducer.reviewTab,
        itemId: state.NavigationReducer.reviewTab.itemId,
        user: state.UserReducer.profile,
    }
}
module.exports = connect(mapStateToProps)(ReviewTab);
