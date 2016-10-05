//
// Description: producerList.js
// This contains the declaration for a producerList
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity } from 'react-native';

import StarRating from 'react-native-star-rating';


// Import internals
import ProducerItem from './producerItem.js';

class ProducerList extends Component {
    render() {
        return (
            <View style={{marginTop:10}}>
                {this._renderProducers()}
            </View>
        );
    }

    _renderProducers() {
        var producers=[];
        for (var i=0; i < this.props.producerList.length; i++) {
             var producerId = this.props.producerList[i].id;
             var producer   = this.props.producerList[i];
             producers.push(
                <ProducerItem key={producerId} goProducer={(producerId) => this.props.goProducer(producerId)} producer={producer}/>
             );
        }
        return producers;
    }
}
module.exports = ProducerList;
