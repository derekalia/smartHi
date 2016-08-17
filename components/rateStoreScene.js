//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import StarRating from 'react-native-star-rating';2
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {RateStoreAction,} from '../actions';

class RateStoreScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'Uncle Ikes',
            address:'Seattle, WA',
        }
    }

    _onComment(text) {
        this._comment = text;
    }

    _onRating(rating) {
        this._rating = rating;
    }
    
    _onPost() {
        this.props.RateStoreAction(this.props.id,this._comment,this._rating);
    }

    render() {
        return (
          <ScrollView style={{backgroundColor:'white',}}>
              <View style={{ flex: 1 }}>
                  <View style={{ height: 238, justifyContent: "flex-end" }}>
                      <Image source={require('../media/ikes1.png') } style={{ height: 190, width: 380 }}/>
                  </View>
                  {/*Rating and link to map*/}
                  <View style={{ marginTop: 10, marginHorizontal: 10,flexDirection:'row' }}>
                      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.state.name}</Text>
                      <Text style={{ fontSize: 22, }}> {this.state.address}</Text>
                  </View>

                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{  justifyContent: 'center' }}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rate</Text>
                      </View>
                  <View style={{ justifyContent: "flex-end", marginHorizontal: 0 }}>
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
                      </View>

                      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                          <View style={{ height: 40, justifyContent: 'center' }}>
                              <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Comment</Text>
                          </View>
                          <View style={{ flexDirection: "row",borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 4, }}>
                            <TextInput
                                style={{ height: 60, flex:1, margin: 4, fontSize: 16, }}
                                onChangeText={(t) => this._setComment(t) }
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
                              marginHorizontal: 10,}}
                              onPress={()=> this._onPost()}
                              > Post </Text>
                          </TouchableOpacity>
                      </View>

                  </View>
          </ScrollView>
        );
    }
}

//
// BatsFix. Not sure if we should tie this to review reducer store.
//
function mapStateToProps(state) {
    return {
        retailer: state.ReviewReducer.retailer,
    }
}
//
// connect to RateStoreAction 
//
function mapActionToProps(dispatch) { return bindActionCreators({ RateStoreAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(RateStoreScene);


module.exports = RateStoreScene;
