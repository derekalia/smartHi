//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight,TouchableOpacity, Navigator} from 'react-native'

class TestScene2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <ScrollView style={{backgroundColor:'white'}}>
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
                  <View style={{ flexDirection:'row', marginTop: 20, marginHorizontal: 10,alignItems:'center' }}>
                      <View style={{borderWidth:1,borderColor:'lightgrey',flex:1 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold',margin:3,}}>Product Name</Text>
                      </View>
                  </View>
                  <View style={{marginHorizontal: 10, flexDirection:'row', width:150, alignItems:'center',marginTop: 20,}}>
                     <TouchableHighlight style={{ backgroundColor: "white",
                                                borderRadius: 20,
                                                borderWidth: 1,
                                                borderColor: '#4A90E2',
                                                marginRight:10
                                                 }}>
                          <Text style={{ fontSize: 16, color: "#4A90E2", margin: 6, marginHorizontal:14, textAlign:'center' }}>tag 1</Text>
                      </TouchableHighlight>
                      <TouchableHighlight style={{ backgroundColor: "white",
                                                 borderRadius: 20,
                                                 borderWidth: 1,
                                                 borderColor: '#4A90E2',
                                                  }}>
                           <Text style={{ fontSize: 16, color: "#4A90E2", margin: 6, marginHorizontal:14, textAlign:'center' }}>tag 2</Text>
                       </TouchableHighlight>

                    </View>
                  {/*Description*/}
                  <View style={{ marginHorizontal: 10,marginTop:20 }}>
                      <View style={{ flex: 1, height: 85, borderWidth:1,borderColor:'lightgrey',marginTop:10 }}>
                          <Text style={{fontSize:16}}> Add Product Description</Text>
                      </View>
                  </View>

                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 30, }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Effects</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1.5 }}>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}>effect tag</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}>effect tag</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}>effect tag</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={{ flex: 3 }}>
                              <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: 100 }]}>
                                  <Text style={Styles.tagTextType}> </Text>
                              </View>
                              <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: 150 }]}>
                                  <Text style={Styles.tagTextType}> </Text>
                              </View>
                              <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: 200 }]}>
                                  <Text style={Styles.tagTextType}> </Text>
                              </View>
                          </View>
                      </View>
                  </View>

                  <View style={{marginTop:50}}></View>

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
        fontSize:16,
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

module.exports = TestScene2;
