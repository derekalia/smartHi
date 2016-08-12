//
// Description: productFrame.js
// Used for searching and listing products 
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import RetailerList   from './retailerList.js';
import {GetRetailerAction}   from '../actions';


class RetailerFrame extends Component {
    constructor(props) {
        super(props);
    }

    _goRetailer(retailerId) {
        //
        // Go to product page
        //
       this.props.GetRetailerAction(retailerId);
    }


    render() {
        return(
        <ScrollView style={{marginTop: 0,}}>
            <View style={{}}>
                {/*Search results section*/}
                <RetailerList retailers={this.props.retailerList} goRetailer={(id)=> this._goRetailer(id)}/>
            </View>
        </ScrollView>
        );
    }
}

//
// Connect state.SearchReducer.retailers  to props
//
function mapStateToProps(state) {
    return {
        retailerList: state.SearchReducer.retailers,
    }
}

//
// Connect GetRetailerAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetRetailerAction }, dispatch); }

module.exports = connect(mapStateToProps,mapActionToProps)(RetailerFrame);
