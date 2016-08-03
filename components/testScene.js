//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

class TestScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View style={{backgroundColor:'white'}}>
              <View style={{ flex: 1 }}>
                  <View style={{marginTop:66, height: 180, justifyContent: "center",alignItems:'center',backgroundColor:'lightgrey' }}>
                  <TouchableHighlight style={{ backgroundColor: "#4A90E2",
                                             borderRadius: 8,
                                             borderWidth: 1,
                                             justifyContent: 'flex-end',
                                             borderColor: '#4A90E2',
                                              }}><Text style={{ fontSize: 18, color: "white", margin: 4 }}>Upload Image</Text></TouchableHighlight>
                  </View>
                  {/*Rating and link to map*/}
                  <View style={{ flexDirection:'row', marginTop: 10, marginHorizontal: 10,alignItems:'center' }}>
                      <View style={{borderWidth:1,borderColor:'lightgrey',flex:1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold',margin:3,}}>Company Name</Text>
                      </View>
                      <View style={{width:150, alignItems:'center'}}>
                         <TouchableHighlight style={{ backgroundColor: "#4A90E2",
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    borderColor: '#4A90E2',
                                                     }}>
                              <Text style={{ fontSize: 18, color: "white", margin: 4 }}>Store Location</Text>
                          </TouchableHighlight>
                        </View>
                  </View>
                  {/*Description*/}
                  <View style={{ marginHorizontal: 10 }}>
                      <View style={{ flex: 1, height: 85, borderWidth:1,borderColor:'lightgrey',marginTop:10 }}>
                          <Text style={{fontSize:16}}> Add Store Description</Text>
                      </View>
                  </View>

              </View>

          </View>
        );
    }
}

module.exports = TestScene;
