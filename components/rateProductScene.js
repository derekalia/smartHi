//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import {GetRetailerAction,GetProducerAction,} from '../actions';
import StarRating from 'react-native-star-rating';
import ReviewList   from './reviewList.js';

class RateProductScene extends Component {
  constructor(props) {
      super(props);
      // these should come from the app state.
      this.state = this.props.product;
      starCount: 0
  }

  _onQuality(rating) {
      this.setState({
          quality: rating
      });
  }
  _onPotency(rating) {
      this.setState({
          potency: rating
      });
  }
  _onFlavor(rating) {
      this.setState({
          flavor: rating
      });
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
                  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>FORGED Rosin - XJ-13</Text>
              </View>
              <View style={{ marginTop: 5, marginHorizontal: 10,flexDirection: "row" }}>
                  <View style={{flex:1,flexDirection: "row",justifyContent:'flex-end' }}>
                    <TouchableOpacity style={Styles.tagCategory}>
                        <Text style={Styles.tagTextCategory}>rosin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.tagType}>
                        <Text style={Styles.tagTextType}>sativa</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              {/* Description */}
              <View style={{ marginHorizontal: 10 }}>
                  <View style={{ flex: 1,justifyContent: 'center',marginTop:10,marginBottom:5 }}>
                      <Text style={{fontSize:16}}>
                      FORGED Rosin Is our process of extracting oils from cannabis. We use very low temperatures to reduce the terpene evaporation which is critical to the experience of our product.
                     </Text>
                  </View>
              </View>
              {/*Rating breakdown*/}
              <View style={{ marginHorizontal: 10,marginTop: 15  }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rating</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, }}>
                          <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                              <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Quality</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                              <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Flavor</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                              <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Potency</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{ flex: 3 }}>
                          <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                              <StarRating
                                  disabled={false}
                                  maxStars={5}
                                  starSize={30}
                                  starColor={'#D0021B'}
                                  rating={0}
                                  selectedStar={(rating) => this._onQuality(rating)}
                                  />
                          </View>
                          <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                              <StarRating
                                  disabled={false}
                                  maxStars={5}
                                  starSize={30}
                                  starColor={'#D0021B'}
                                    rating={0}
                                  selectedStar={(rating) => this._onFlavor(rating) }
                                  />
                          </View>
                          <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                              <StarRating
                                  disabled={false}
                                  maxStars={5}
                                  starSize={30}
                                  starColor={'#D0021B'}
                                  rating={0}
                                  selectedStar={(rating) => this._onPotency(rating) }
                                  />
                          </View>
                      </View>
                  </View>
              </View>
              {/* Test results */}
              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                  <View style={{ justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Test Results</Text>
                      <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',height:20,marginTop:20,marginRight:5}}>
                        <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>THCA</Text>
                        <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>THC</Text>
                        <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>CBD</Text>
                        <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>TOTAL</Text>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',height:30,marginRight:5}}>
                        <Text style={{width:60,textAlign:'center',fontSize: 16}}>12%</Text>
                        <Text style={{width:60,textAlign:'center',fontSize: 16}}>11%</Text>
                        <Text style={{width:60,textAlign:'center',fontSize: 16}}>8%</Text>
                        <Text style={{width:60,textAlign:'center',fontSize: 16}}>56%</Text>
                      </View>
                  </View>
              </View>

              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1.4 }}>
                          <TouchableOpacity style={Styles.tagEffect}>
                              <Text style={Styles.tagTextEffect}>effect</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={Styles.tagEffect}>
                              <Text style={Styles.tagTextEffect}>+</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{ flex: 3 }}>
                          <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: 40 }]}>
                              <Text style={Styles.tagTextEffect}> </Text>
                          </View>
                          <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: 40 }]}>
                              <Text style={Styles.tagTextEffect}> </Text>
                          </View>
                      </View>
                  </View>
              </View>
              {/* Related activities */}
              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activies</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity style={Styles.tagActivity}>
                          <Text style={Styles.tagTextActivity}>activity</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={Styles.tagActivity}>
                          <Text style={Styles.tagTextActivity}> + </Text>
                      </TouchableOpacity>

                  </View>
              </View>

              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Symptoms</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity style={Styles.tagSymptom}>
                          <Text style={Styles.tagTextSymptom}>symptom</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={Styles.tagSymptom}>
                          <Text style={Styles.tagTextSymptom}> + </Text>
                      </TouchableOpacity>
                  </View>
              </View>

              <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                  <View style={{ height: 40, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Comment</Text>
                  </View>
                  <View style={{ flexDirection: "row",borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 4, }}>
                    <TextInput
                        style={{ height: 60, flex:1, margin: 4, fontSize: 16, }}
                        onChangeText={(text) => this.setState({ text }) }
                        placeholder={'Say something'}
                        numberOfLines = {4}
                        multiline = {true}
                        />
                  </View>
                  <TouchableOpacity style={{  margin: 4,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ED3C52",
                    backgroundColor: '#ED3C52',
                    justifyContent: 'center',
                    alignItems: 'center',width:80}}>
                      <Text style={{color: "white",fontWeight:'bold',fontSize:16,
                      marginTop: 7,
                      marginBottom: 7,
                      marginHorizontal: 10,}}> Post </Text>
                  </TouchableOpacity>
              </View>

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
    tagType: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F7A700",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#F7A700",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagCategory: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#7BD500",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextCategory: {
        color: "#7BD500",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },


    tagEffect: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextEffect: {
        color: "#4A90E2",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagActivity: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BE00E3",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextActivity: {
        color: "#BE00E3",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagSymptom: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ED3C52",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptom: {
        color: "#ED3C52",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
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
