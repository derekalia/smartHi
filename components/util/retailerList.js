//
// Description: retailerList.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import RetailerItem from './retailerItem.js';


class RetailerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{marginTop:10}}>
                {this._renderRetailers()}
            </View>
        );
    }

    _renderRetailers() {
        // 
        //BatsFix. List view for some reason does not show on first render...
        //so using explicit render
        var retailers=[];
        for (var i=0; i < this.props.retailerList.length; i++) {
             retailer = this.props.retailerList[i];
             if (this.props.retailerList[i].price != null) {
                 //BatsFix. This is actually a price object with retailer object inside it.
                 retailer = this.props.retailerList[i].retailer;
                 retailer.price = this.props.retailerList[i].price;
             }
             var retailerId = retailer.id;

             retailers.push(
                <RetailerItem key={retailerId} goRetailer={(retailerId) => this.props.goRetailer(retailerId)} retailer={retailer}/>
             );
        }
        return retailers;
    }
    /*
    _renderRetailer(rowData) {
        return (
            <RetailerItem goRetailer={(retailerId) => this.props.goRetailer(retailerId)} retailer={rowData}/>
        )
    }

    _renderRetailers() {
        //BatsFix. List view for some reason does not show on first render...
        if (this.props.retailers.length !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1!=r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.retailers) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderRetailer.bind(this) }
                    />
            );
        }
        return null;
    }
    */
}

module.exports = RetailerList;
