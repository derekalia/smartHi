//
// Description: retailerList.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

class RetailerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {_renderRetailers()}
            </View>
        );
    }

    _renderRetailer(rowData) {
        return (
            <RetailerItem goRetailer={(retailerId) => this._goRetailer(retailerId)} retailer={rowData}/>
        )
    }

    _renderRetailers() {
        if (this.props.retailers.size !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.retailers) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderRetailer.bind(this) }
                    />
            );
        }
        return null;
    }
}

module.exports = RetailerList;
