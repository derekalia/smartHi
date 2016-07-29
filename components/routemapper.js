//
// Description: routemapper.js
// This contains the declaration for the route mapper used throughout the app.
// It should only contain forward and back manipulation logic, style of the navigation
// map
//

import React, { Component } from 'react';
import {StyleSheet, Navigator, Text, View, Image } from 'react-native';

var RouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Styling should be moved to common
        if (index > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13, }}>
                    <Image source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text onPress={navigator.jumpBack} style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
            return null;
        },


    Title: function (route, navigator, index, navState) {
        return (
            <Text style={{ fontSize: 18, marginTop: 11, fontWeight: 'bold' }}>
                {route.title}
            </Text>
        );
    }
}

module.exports = RouteMapper;
