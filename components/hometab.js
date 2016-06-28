//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';

//get internal components
import Styles        from './styles.js';
import HomeScene     from './homescene.js';
import SearchScene   from './searchscene.js';
import ProductScene  from './productscene.js';

const HomeSceneIndex       = 0;
const SearchSceneIndex     = 1;
const ResultSceneIndex     = 2;
const ProductSceneIndex    = 3;
const ProducerSceneIndex   = 4;

/*
class SearchScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Search Scene Placeholder</Text>
                </View>
            );
    }
}
*/

class ResultScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Search Result Scene Placeholder</Text>
                </View>
            );
    }
}

/*
class ProductScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Product Scene Placeholder</Text>
                </View>
            );
    }
}
*/
class ProducerScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Producer Scene Placeholder</Text>
                </View>
            );
    }
}



var HomeTabScenes = [
    {title: "Herby",          component: HomeScene,     index: HomeSceneIndex},
    {title: "Search",         component: SearchScene,   index: SearchSceneIndex},
    {title: "Search Results", component: ResultScene,   index: ResultSceneIndex},
    {title: "Producer",       component: ProductScene,  index: ProductSceneIndex},
    {title: "Product",        component: ProducerScene, index: ProducerSceneIndex},
];

var HomeTabRouteMapper = {
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

class HomeTab extends Component {

    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator} 
                   searchScene={HomeTabScenes[SearchSceneIndex]} 
                   producerScene={HomeTabScenes[ProducerSceneIndex]} 
                   productScene={HomeTabScenes[ProductSceneIndex]}/>
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
                initialRoute = {HomeTabScenes[HomeSceneIndex]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {HomeTabRouteMapper}
                    />
                }
            />
        );
    }
}

module.exports = HomeTab;
