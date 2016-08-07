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
                  <View style={{marginTop:63, height: 180, justifyContent: "center",alignItems:'center',backgroundColor:'lightgrey' }}>
                  <TouchableHighlight style={{ backgroundColor: "#4A90E2",
                                             borderRadius: 8,
                                             borderWidth: 1,
                                             justifyContent: 'flex-end',
                                             borderColor: '#4A90E2',
                                              }}><Text style={{ fontSize: 18, color: "white", margin: 4 }}>Upload Image</Text></TouchableHighlight>
                  </View>
                  {/*Rating and link to map*/}
                  <View style={{ flexDirection:'row', marginTop: 10, marginHorizontal: 10,alignItems:'center' }}>
                    <View style={{flex:1, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 4, }}>
                      <TextInput
                          style={{ height: 26,  margin: 4, fontSize: 16, }}
                          onChangeText={(text) => this.setState({ text }) }
                          placeholder={'Product Name'}
                          />
                    </View>
                  </View>
                  {/*Description*/}
                  <View style={{ marginHorizontal: 10, marginTop:10 }}>
                  <View style={{flex:1, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 4, }}>
                    <TextInput
                        style={{ height: 80,  margin: 4, fontSize: 16, }}
                        onChangeText={(text) => this.setState({ text }) }
                        placeholder={'Product Description'}
                        numberOfLines = {5}
                        multiline = {true}
                        />
                  </View>
                  </View>


                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 30, }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Category</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity style={Styles.tagCategory}>
                                  <Text style={Styles.tagTextCategory}> tag </Text>
                              </TouchableOpacity>
                      </View>
                  </View>

                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 30, }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Type</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity style={Styles.tagType}>
                                  <Text style={Styles.tagTextType}> tag </Text>
                              </TouchableOpacity>
                      </View>
                  </View>


                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <View style={{ height: 30, }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Effects</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={Styles.tagEffect}>
                                    <Text style={Styles.tagTextEffect}> tag </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagEffect}>
                                    <Text style={Styles.tagTextEffect}> + </Text>
                                </TouchableOpacity>
                        </View>
                    </View>

                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 30, }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Activity</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity style={Styles.tagActivity}>
                                  <Text style={Styles.tagTextActivity}> tag </Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.tagActivity}>
                                  <Text style={Styles.tagTextActivity}> + </Text>
                              </TouchableOpacity>
                      </View>
                  </View>



                  <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                      <View style={{ height: 30, }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Symptoms</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity style={Styles.tagSymptom}>
                                  <Text style={Styles.tagTextSymptom}> tag </Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.tagSymptom}>
                                  <Text style={Styles.tagTextSymptom}> + </Text>
                              </TouchableOpacity>
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
        borderColor: "#F5A623",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#F5A623",
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

module.exports = TestScene2;
