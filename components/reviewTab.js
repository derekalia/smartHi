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
import {RateQueueSceneId,CameraSceneId, ProductInfoSceneId, RateProductSceneId, RateStoreSceneId, ReviewTabId,ReviewStartSceneId} from '../common/const.js';

// Import internal modules
import ReviewStartScene   from './scenes/review/reviewStartScene.js';
import CameraScene        from './scenes/camera/cameraScene.js';
import ProductInfoScene   from './scenes/productInfo/productInfoScene.js';
import RateProductScene   from './scenes/rateProduct/rateProductScene.js';
import RateStoreScene     from './scenes/rateStore/rateStoreScene.js';
import RateQueueScene     from './scenes/rateQueue/rateQueueScene.js';

import {HerbyBar}         from '../common/controls.js';

const ReviewStartIndex  = 0;
const CameraIndex       = 1;
const ProductInfoIndex  = 2;
const RateProductIndex  = 4;
const RateStoreIndex    = 4;
const RateQueueIndex    = 5;

const TabScenes = [
    { title: "Review",       component: ReviewStartScene,  index: ReviewStartSceneId },
    { title: "Camera",       component: CameraScene,       index: CameraSceneId },
    { title: "Product Info", component: ProductInfoScene,  index: ProductInfoSceneId },
    { title: "Rate Product", component: RateProductScene,  index: RateProductSceneId },
    { title: "Rate Store",   component: RateStoreScene,    index: RateStoreSceneId },
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
        if (sceneId == ReviewStartSceneId) {
            // reset scenes.
            this.refs.navigator.popToTop();
            return;
        }

        // Otherwise it is a scene change.
        // Check existing routes first. BatsFix is this the right approach?

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
                initialRoute = {TabScenes[ReviewStartIndex]}
            />
        );
    }
}

function mapStateToProps(state) { 
    return { 
        tabId: state.NavigationReducer.tabId,
        scene: state.NavigationReducer.reviewTab, 
    }
} 
module.exports = connect(mapStateToProps)(ReviewTab);
