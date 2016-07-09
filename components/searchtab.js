//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';

//get internal components
import Styles        from './styles.js';
import SearchScene   from './searchscene.js';
import ProductScene  from './productscene.js';

const HomeSceneIndex       = 0;
const SearchSceneIndex     = 1;
const ProductSceneIndex    = 2;
const ProducerSceneIndex   = 3;
const ProducersSceneIndex  = 4;
const ProductsSceneIndex   = 5;

class ProductsScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Products Scene Placeholder</Text>
                </View>
            );
    }
}
class ProducerScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Producer Scene Placeholder</Text>
                </View>
            );
    }
}
class ProducersScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Producers Scene Placeholder</Text>
                </View>
            );
    }
}

var SearchTabScenes = [
    {title: "Search",         component: SearchScene,    index: SearchSceneIndex},
    {title: "Producer",       component: ProductScene,   index: ProductSceneIndex},
    {title: "Product",        component: ProducerScene,  index: ProducerSceneIndex},
    {title: "Products",       component: ProducersScene, index: ProducersSceneIndex},
    {title: "Producers",      component: ProductsScene,  index: ProductsSceneIndex},
];

var SearchTabRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        // BatsFix. Do something other than "Back" text
        
        if (index > 0) {
            return (
                <Text onPress={navigator.jumpBack}>Back</Text>
            );
        }
    },
    RightButton: function(route, navigator, index, navState) {
        // BatsFix. Do make sure to go to the next page if there is one
        var routelist = navigator.getCurrentRoutes();
        console.log("on route size "+routelist.length);
        console.log("on index "+index);
        if (routelist.length > index+1) {
            return (
                <Text onPress={navigator.jumpForward}>Forward</Text>
             );
        }
        else {
            return null;
        }

    },
    Title: function(route, navigator, index, navState) {
        return (
            <Text style={Styles.header}>
                  {route.title}
            </Text>
        );
    }
}

class SearchTab extends Component {

    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator} 
                   searchScene={SearchTabScenes[SearchSceneIndex]} 
                   producerScene={SearchTabScenes[ProducerSceneIndex]} 
                   productScene={SearchTabScenes[ProductSceneIndex]}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {SearchTabScenes[SearchSceneIndex]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {SearchTabRouteMapper}
                    />
                }
            />
        );
    }
}

module.exports = SearchTab;
