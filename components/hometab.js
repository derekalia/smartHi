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
import {HomeSceneId, ProductSceneId, ProducerSceneId,} from '../common/const.js';

// Import internal modules
import HomeScene     from './homescene.js';
import ProductScene  from './productscene.js';
import ProducerScene  from './producerscene.js';
import RouteMapper   from './routemapper.js';

const HomeIndex     = 0;
const ProductIndex  = 1;
const ProducerIndex = 2;

const HomeTabScenes = [ 
    { title: "Herby",    component: HomeScene,     index: HomeSceneId },
    { title: "Product",  component: ProductScene,  index: ProductSceneId },
    { title: "Producer", component: ProducerScene, index: ProducerSceneId },
];

class HomeTab extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTab == 'HomeTab') {
            var sceneId = nextProps.sceneId;
            for(var index in HomeTabScenes) {
                 if (HomeTabScenes.index == sceneId) {
                    this.refs.navigator.push(HomeTabScenes[i]);
                 }
            }
        }
    }
    
    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator}/>
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
                initialRoute = {HomeTabScenes[HomeIndex]}
                navigationBar={
                    <Navigator.NavigationBar 
                        routeMapper = {RouteMapper}
                        >
                    </Navigator.NavigationBar>
                }
                />
        );
    }
}

function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(HomeTab);
