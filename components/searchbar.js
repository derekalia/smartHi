//
// Description: searchbar.js
// 

import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'

class SearchBar extends Component {

     _onChange(event) {
        this.props.setSearchTerm(event.nativeEvent.text);
    }

  
    render() {
        return (
             <View style={{flexDirection: "row", marginTop: 20, marginBottom: 0, marginHorizontal: 10, }}>
                <View style={[{ flex: 5, }]}>
                    <TextInput style={[Styles.input]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = " Keyword"
                        returnKeyType   = "next"
                        onChange        = {(e) => this._onChange(e)}
                        />
                </View>
                <View style={[{ flex: 1, borderWidth: 1, borderColor: "#4A90E2", backgroundColor: "#4A90E2", height: 50 }]}>
                    <TouchableOpacity style={{}} onPress={this.props.startSearch}>
                        <Image style={{ height: 32, width: 32, marginLeft: 13, marginTop: 8 }} source={require("../media/SearchIcon0.png") }/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

module.exports = SearchBar;

const Styles={
    input: {
        height: 50,
        fontSize: 20,

        backgroundColor: 'white',
        borderRadius: 0,
        borderColor: "#4A90E2",

        borderWidth: 1,
    },
}
