//
// Description: productFrame.js
// Used for searching and listing products 
//
import React, { Component } from 'react';
import {MapView, StyleSheet, Text, View, Image, TextInput,} from 'react-native'

class MapFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={[{ backgroundColor: 'white' }]}>
                <MapView
                    style={{ height: 620, width: 377 }}
                    showsUserLocation={true}
                    region={{ latitude: 47.597713, longitude: -122.321777 }}
                    showsCompass = {true}
                    />
            </View>
        );
    }
}

module.exports = MapFrame;
