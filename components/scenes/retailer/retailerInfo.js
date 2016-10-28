//retailerInfo.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';

//get internal components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import StarRating from 'react-native-star-rating';
//get internal components

class RetailerInfo extends Component {
    _onRating(rating) {
    }
    render() {
        return (
        <View style={{backgroundColor:'#ECECEC'}}>
        <ScrollView style={{flex:1,backgroundColor:'white', marginHorizontal:8,borderRadius:4,marginTop: 8}}>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <View style={{flexDirection:'row'}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.props.retailer.name}</Text>
                <View style={{flex:1,alignItems:'flex-end',justifyContent:'center' }}>
                   <TouchableOpacity style={{ backgroundColor: "#4A90E2",
                                              borderRadius: 8,
                                              borderWidth: 3,
                                              borderColor: '#4A90E2',
                                              alignSelf:'flex-end'
                                              }}
                                              onPress={()=>this.props.showMap()}>
                    <Text style={{ fontSize: 18, color: "white",marginHorizontal:10,}}> Show Map </Text>
                </TouchableOpacity>
                </View>
            </View>
                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                  <View style={{flex:1.5,alignItems:'flex-start',flexDirection:'row',marginTop:1}}>
                      <StarRating
                          disabled={true}
                          maxStars={5}
                          starSize={28}
                          starColor={'red'}
                          rating={this.props.retailer.rating}
                          selectedStar={(rating) => this._onRating(rating)  }
                          />
                      <Text style={{ fontSize: 18,marginTop:2 }}> ({this.props.retailer.ratingCount}) </Text>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                    <Text>{this.props.retailer.description}</Text>
                </View>
            </View>
            </ScrollView>
        </View>
        );
    }
}

module.exports=RetailerInfo
