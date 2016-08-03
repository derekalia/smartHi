//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity,TouchableHighlight, Navigator} from 'react-native'

class ProductInfoScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
            <View style={{backgroundColor:'#EFEFF4',height:600, marginTop:64}}>
              <View style={{marginTop:30}}>

                <Text style={{marginLeft:20,marginBottom:10}}>Product Info</Text>
                <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>
                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Lot Number</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                    <Text style={{color:'#C8C8CC'}}>5002 9281 8101 1239</Text>
                    </View>
                  </View>

                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Retailer</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>Uncle Ike's</Text>
                    </View>
                  </View>

                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Producer</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>Forged Cannabis</Text>
                    </View>
                  </View>
                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Product</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>ROJO Stargazer</Text>
                    </View>
                  </View>
                  <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                  <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                    <TouchableHighlight><Text>Price</Text></TouchableHighlight>
                    <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                      <Text style={{color:'#C8C8CC'}}>$30</Text>
                    </View>
                  </View>


                </View>
              </View>
            </View>



                <View style={{marginTop:200}}>
                  <Text style={{marginLeft:20,marginBottom:10}}>Status</Text>
                  <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>
                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                      <TouchableHighlight><Text>Licensee Login</Text></TouchableHighlight>
                      <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                        <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                      </View>
                    </View>
                  </View>
                </View>



            </View>
        );
    }
}

module.exports = ProductInfoScene;
