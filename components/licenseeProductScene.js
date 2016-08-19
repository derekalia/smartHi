//
// Description: licenseeProductScene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class LicenseeProductScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View style={{backgroundColor:'white'}}>
            <Text> Licensee Product Placeholder</Text>
          </View>
        );
    }
}

module.exports = LicenseeProductScene;
