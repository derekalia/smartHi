//
// Description: searchCategory.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'

class SearchCategory extends Component {

     _onChange(event) {
        this.props.setSearchCategory(event.nativeEvent.text);
    }

    render() {
        return (
           <View style={{flexDirection: "row", marginTop: 20, marginBottom: 0, marginHorizontal: 10,justifyContent:'space-around',alignItems:'center',}}>
               <TouchableOpacity style={Styles.category}><Text>All</Text></TouchableOpacity>
               <TouchableOpacity style={Styles.category}><Text>Products</Text></TouchableOpacity>
               <TouchableOpacity style={Styles.category}><Text>Stores</Text></TouchableOpacity>
               <TouchableOpacity style={Styles.category}><Text>Producers</Text></TouchableOpacity>
           </View>
        );
    }
}

module.exports = SearchCategory;

const Styles={
    category: {
        height: 22,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: 'orange',
    },
}
