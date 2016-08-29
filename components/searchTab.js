//
// Description: searchtab.js
// This contains the declaration for the search tab  of the app
// It should only contain search tab scene navigation logic and nothing else.
//
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';
import {connect} from 'react-redux';

//get internal components
import Styles         from './styles.js';
import {SearchSceneId, ProductSceneId, ProducerSceneId, RetailerSceneId, SearchTabId, }   from '../common/const.js';

import SearchScene    from './searchScene.js';
import ProductScene   from './productScene.js';
import RetailerScene  from './retailerScene.js';
import ProducerScene  from './producerScene.js';


const SearchIndex     = 0;
const ProductIndex    = 1;
const RetailerIndex   = 2;
const ProducerIndex   = 3;

var TabScenes = [
    {title: "Search",        component: SearchScene,   index: SearchSceneId},
    {title: "Product",       component: ProductScene,  index: ProductSceneId},
    {title: "Retailer",      component: RetailerScene, index: RetailerSceneId},
    {title: "Producer",      component: ProducerScene, index: ProducerSceneId},
];

class SearchTab extends Component {

    constructor(props) {
        super(props);
	}

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.sceneId;
        // If not found in existing push
        for(var i=0; i < TabScenes.length; i++) {
             if (TabScenes[i].index == sceneId) {
                // BatsFix. Currently push scenes as they come along
                // Later probably need to throttle that
                var currentScene = Object.assign({}, TabScenes[i]);
                currentScene.item = nextProps.item;
                this.refs.navigator.push(currentScene);
                break;
             }
        }
    }

    renderScene(route, navigator) {
        return (
            <View style={{flex:1}}>
                <route.component tabId={SearchTabId} navigator={navigator} item={route.item}/>
            </View>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator style={{}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {TabScenes[0]}
                item={this.props.item}
            />
        );
    }
}

//
// Connect state.NavigationReducer.sceneId to props
//
function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene, item: state.NavigationReducer.item } }
module.exports = connect(mapStateToProps)(SearchTab);
