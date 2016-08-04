//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import StarRating from 'react-native-star-rating';2

class RateStoreScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <ScrollView underlayColor={'white'} style={{backgroundColor:'white',}}>
              <View style={{ flex: 1 }}>
                  <View style={{ height: 248, justifyContent: "flex-end" }}>
                      <Image source={require('../media/ikes1.png') } style={{ height: 190, width: 380 }}/>
                  </View>
                  {/*Rating and link to map*/}
                  <View style={{ justifyContent: "flex-end", marginTop: 10, marginHorizontal: 10 }}>
                      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Uncle Ike's</Text>
                      <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                          <StarRating
                              disabled={true}
                              maxStars={5}
                              starSize={30}
                              starColor={'red'}
                              rating={0}
                              selectedStar={(rating) => this._onRating(rating) }
                              />
                      </View>
                  </View>
                  <View style={{ marginHorizontal: 10,marginTop:20 }}>
                      <View style={{ flex: 1, height: 85, borderWidth:1,borderColor:'lightgrey',marginTop:10 }}>
                          <Text style={{fontSize:16}}> Add Product Description</Text>
                      </View>
                  </View>
                  </View>
          </ScrollView>
        );
    }
}

module.exports = RateStoreScene;
