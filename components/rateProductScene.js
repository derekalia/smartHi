//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import StarRating from 'react-native-star-rating';
import ReviewList   from './reviewList.js';

class RateProductScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <ScrollView style={{backgroundColor:'white'}}>
              <View style={{ flex: 1 }}>
                  {/*Product Image*/}
                  <View style={{ height: 228, justifyContent: "flex-end" }}>
                      <Image source={require('../media/RosinXJ.png') } style={{ height: 190, width: 380 }}/>
                  </View>
                  {/* Overall rating */}
                  <View style={{ justifyContent: "flex-end", marginTop: 10, marginHorizontal: 10 }}>
                      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Rosin XJ-17</Text>
                      {/* <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                          <StarRating
                              disabled={true}
                              maxStars={5}
                              starSize={30}
                              starColor={'red'}
                              rating={0}
                              selectedStar={(rating) => this._onRating(rating) }
                              />
                          <Text style={{ fontSize: 19 }}>  </Text>
                      </View>*/}
                  </View>
                  {/* Description */}
                  <View style={{ marginHorizontal: 10 }}>
                      <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                          <Text>
                              Its grrrrrreat!
                         </Text>
                      </View>
                  </View>
                  {/*Rating breakdown*/}
                  <View style={{ marginHorizontal: 10 }}>
                      <View style={{ height: 40, justifyContent: 'center' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rating</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1, }}>
                              <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                                  <Text style={[{ color: 'black', margin: 7 }]}>Quality</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                                  <Text style={[{ color: 'black', margin: 7 }]}>Flavor</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                                  <Text style={[{ color: 'black', margin: 7 }]}>Potency</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={{ flex: 3 }}>
                              <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                  <StarRating
                                      disabled={false}
                                      maxStars={5}
                                      starSize={30}
                                      starColor={'red'}
                                      rating={0}
                                      selectedStar={(rating) => this._onQuality(rating)}
                                      />
                              </View>
                              <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                  <StarRating
                                      disabled={false}
                                      maxStars={5}
                                      starSize={30}
                                      starColor={'red'}
                                      rating={0}
                                      selectedStar={(rating) => this._onFlavor(rating) }
                                      />
                              </View>
                              <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                  <StarRating
                                      disabled={false}
                                      maxStars={5}
                                      starSize={30}
                                      starColor={'red'}
                                      rating={0}
                                      selectedStar={(rating) => this._onPotency(rating) }
                                      />
                              </View>
                          </View>
                      </View>
                  </View>
                  {/* Test results */}
                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 40, justifyContent: 'center' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Test Results</Text>
                          <Text style={{}}>THC: 1% CBD: 1% THCA: 1% TOTAL CANNABNOIDS: 100%</Text>
                      </View>
                  </View>
                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 40, justifyContent: 'center' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}>tag</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}>tag</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}>tag</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={{ flex: 3 }}>
                          </View>
                      </View>
                  </View>
                  {/* Related activities */}
                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 40, justifyContent: 'center' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activies</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity style={Styles.tagType}>
                              <Text style={Styles.tagTextType}>tag</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={Styles.tagType}>
                              <Text style={Styles.tagTextType}>tag</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={Styles.tagType}>
                              <Text style={Styles.tagTextType}>tag</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                  {/* Reviews */}
                  <ReviewList/>
                  {/* Retailers */}
              </View>
          </ScrollView>
        );
    }
}

const Styles = StyleSheet.create({
    tagType: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BD10E0",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#BD10E0",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
    },


    storeItem: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        margin: 5,

    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    bg: {
        position: 'absolute',
        width: 355,
        height: 100,
        borderTopLeftRadius: 60,
        borderRadius: 6
    },
    storeName: {
        margin: 3,
        marginTop: 5,
        marginLeft: 7,
        color: 'white',
        fontSize: 26,
        textShadowOffset: { width: 1.2, height: 1.2 },
        textShadowColor: 'black',
        textShadowRadius: 2
    },
    rowContainerStars: {
      flexDirection: 'row',
      marginTop: 8,
      marginRight: 3,
    },
    storePrice1: {
        margin: 3,
        flex: 1,
        marginTop: 5,
        marginLeft: 7,
        color: 'white',
        fontSize: 26,
        textAlign: 'right',
        width: 210,
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowColor: 'black',
        textShadowRadius: 2

    }, storeLocation: {
        marginLeft: 7,
        color: 'white',
        fontSize: 15,
        textShadowOffset: { width: 1.2, height: 1.2 },
        textShadowColor: 'black',
        textShadowRadius: 2
    },
})


module.exports = RateProductScene;
