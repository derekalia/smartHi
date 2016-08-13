//
// Description: productFrame.js
// Used for searching and listing products 
//
import React, { Component } from 'react';
import {Alert,MapView, StyleSheet, Text, View, Image, TextInput,TouchableOpacity,} from 'react-native'
/*
        mapItems = [
            {latitude:47.608013, 
             longitude:-122.335167,
             title:'mystore',
             subtitle:'mystoresubtitle',
             onFocus:function(){console.log("got focus")},
             onBlur:function(){console.log("lost focus")},
            },
        ];
*/

class MapItem extends Component {
    constructor(props) {
        super(props);
        this._description ="Test Retailer";
    }
    _onPress() {
        console.log("probably should go to the retailer");
    }
    render() {
        return (
             <TouchableOpacity onPress={()=>this._onPress()}>
                <Text>{this._description}</Text>
                <Text>Rating:5</Text>
             </TouchableOpacity>
        );
    }
}

class MapFrame extends Component {
    constructor(props) {
        super(props);
        mapItems = [];
        //it should be
        // var retailer = this.props.retailer;
        var retailer = {latitude: 47.597713,longitude: -122.321777,title:'Uncle Ike Here'};
        mapItems.push(this._getRetailerItem(retailer));
        this.state = {mapItems:mapItems};
        this._title="bdbad";
    }
    _getRetailerItem(retailer) {
        console.log("retailer title was" + retailer.title);
        return ({latitude:retailer.latitude,
                 longitude:retailer.longitude,
                 tintColor:'blue',
                 rightCalloutView: (<MapItem/>),
        });
    }
    render() {
        return(
            <View style={[{ backgroundColor: 'white' }]}>
                <MapView
                    style={{ height: 620, width: 377 }}
                    showsUserLocation={true}
                    region={{ latitude: 47.597713, longitude: -122.321777, latitudeDelta: 0.5, longitudeDelta: 0.5, }}
                    showsCompass = {true}
                    annotations = {this.state.mapItems}
                    />
            </View>
        );
    }
}

module.exports = MapFrame;
