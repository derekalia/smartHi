//
// Description: productFrame.js
// Used for searching and listing products 
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class RetailerFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <ScrollView style={{marginTop: 0,}}>
            <Text> Retailer frame placeholder</Text>
        </ScrollView>
        );
    }
}

module.exports = RetailerFrame;
