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
        <View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.props.retailer.name}</Text>
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

                    <View style={{flex:1,alignItems:'flex-end',justifyContent:'center' }}>
                       <TouchableOpacity style={{ backgroundColor: "#4A90E2",
                                                  borderRadius: 8,
                                                  borderWidth: 4,
                                                  borderColor: '#4A90E2',
                                                  alignSelf:'flex-end'
                                                  }}
                                                  onPress={()=>this.props.showMap()}>
                        <Text style={{ fontSize: 18, color: "white"}}> Show Map </Text>
                    </TouchableOpacity>
                    </View>

                </View>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                    <Text>{this.props.retailer.description}</Text>
                </View>
            </View>
        </View>
        );
    }
}

module.exports=RetailerInfo
