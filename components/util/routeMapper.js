//
// Description: routemapper.js
// This contains the declaration for the route mapper used throughout the app.
// It should only contain forward and back manipulation logic, style of the navigation
// map
//

import React, { Component } from 'react';
import {StyleSheet, Navigator, Text, View, Image,TouchableHighlight } from 'react-native';

var RouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Styling should be moved to common
        if (index > 0) {
            return (
              <TouchableHighlight onPress={navigator.jumpBack} underlayColor={'#f9f9f9'}>
                <View style={{ marginTop: 11, flexDirection: "row", marginLeft: 13,alignItems:'flex-start', }}>
                    <Image  source={require("../../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
                </TouchableHighlight>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
            return null;
        },


    Title: function (route, navigator, index, navState) {
        return null;
    }
}

module.exports = RouteMapper;
