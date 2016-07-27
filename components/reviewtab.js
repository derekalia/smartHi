//
// Description: reviewtab.js
// This contains the declaration for the review tab  of the app.
// It should only contain rate scenes navigation.
// 

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {Connect} from 'react-redux';

class ReviewTab extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Text>Review tab placeholder</Text>
            </View>
        );
    }
}

module.exports = ReviewTab;
