//
// Description: userFrame.js
// Used for searching and listing users 
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class UserFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <ScrollView style={{marginTop: 0,}}>
            <Text>User frame placeholder</Text>
        </ScrollView>
        );
    }
}

module.exports = UserFrame;
