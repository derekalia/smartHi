//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

class ProductInfoScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 70 }}>
                <Text>Placeholder for {this.props.title} </Text>
                <Text>Click Forward/Back to go to a different test scene. To add an additional test
                scene modify create the scene similar to testscene.js and add it to reviewtab.js route stack.
                similar to how TestScene was added.
                </Text>
            </View>
        );
    }
}

module.exports = ProductInfoScene;
