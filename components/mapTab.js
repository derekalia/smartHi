//
// Description: maptab.js
// This contains declaration for the map tab of the app.
// 

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, MapView } from 'react-native';
import {Connect} from 'react-redux';

class MapTab extends Component {

    render() {
        return (
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

module.exports = MapTab;
