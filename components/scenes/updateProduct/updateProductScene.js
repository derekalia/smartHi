//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {Platform,Alert,StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity,TouchableHighlight, Navigator, Dimensions,} from 'react-native'

import ImagePicker from 'react-native-image-picker';
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {UpdateProductAction,} from '../../../actions';
import StarRating from 'react-native-star-rating';
import ReviewList   from '../../util/reviewList.js';
import FilterItem   from '../../util/filterItem.js';

import {HerbyButton2,HerbyBar,} from '../../../common/controls.js';
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../../../common/filters.js';

class UpdateProductScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.
        this._defaultImage = require('../../../media/GreyBox11.png');
        this._effect   = FiltersEffect;
        this._symptom  = FiltersSymptoms;
        this._activity = FiltersActivity;

        var product = this.props.item;
        product.showSlider = false;
        product.imageSource = this._defaultImage;

        this.state = product;

        //
        // BatsFix. Assuming that no filters were selected. Is that correct?
        //
        for (var i=0; i < this._effect.length; i++) { this._effect[i].selected = false };
        for (var i=0; i < this._symptom.length; i++) { this._symptom[i].selected = false };
        for (var i=0; i < this._activity.length; i++) { this._activity[i].selected = false };
    }

    render() {
        return (
        <View style={{flex:1}}>
        <HerbyBar navigator={this.props.navigator} name="Update Product" back="Back" forward="Done" forwardCallback={()=>this._updateProduct()}/>
        <ScrollView style={{flex:1, backgroundColor:'white'}}>
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: "flex-start" }}>
                    <Image source={this.state.imageSource} style={{ height: 190, width: 380 }}/>
                </View>
                <TouchableHighlight onPress={()=>this._showImagePicker()} style={{marginTop:5,backgroundColor:'#468ee5',marginTop:10,height:30,width:150,borderRadius:8,justifyContent:'center',alignSelf:'center'}}>
                  <Text style={{color:'white',alignSelf:'center'}}>
                    Choose Image
                  </Text>
                </TouchableHighlight>

                {this._renderRating()}

                {this._renderDescription()}
                {/* <View style={{ marginTop: 5, marginHorizontal: 10 }}>
                  <View><Text>Scan Barcode</Text>
                  <TouchableHighlight onPress={()=>this._showImagePicker()} style={{marginTop:5,backgroundColor:'#468ee5',marginTop:10,height:30,width:150,borderRadius:8,justifyContent:'center',alignSelf:'flex-start'}}>
                    <Text style={{color:'white',alignSelf:'center'}}>
                      Enter Lot Number
                      </Text>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={()=>this._showImagePicker()} style={{marginTop:5,backgroundColor:'#468ee5',marginTop:10,height:30,width:150,borderRadius:8,justifyContent:'center',alignSelf:'flex-start'}}>
                        <Text style={{color:'white',alignSelf:'center'}}>
                          Scan Bardcode(s)
                          </Text>
                          </TouchableHighlight>
                      <View style={{flexDirection:'row'}}>
                      <Text>6000 0000 0000 0001</Text><Text> Edit</Text><Text> Remove</Text>
                      </View>
                      </View>
                      </View> */}
                {this._renderDetailRating()}

                {this._renderTestResults()}

                {this._renderFilters()}



            </View>
        </ScrollView>
        </View>
        );
    }

    _showImagePicker() {
        var options = {
            title: 'Select producer image',
            customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options,(response) => {
            var source = '';
            if (response.didCancel) {
            }
            else
            if (response.error) {
            }
            else {
                if (Platform.OS === 'ios') {
                    source = {uri: response.uri.replace('file://',''),isStatic:true}
                }
                else {
                    source = { uri: response, isStatic:true}
                }
                this.setState({imageSource:source});
            }
        });
    }

    _updateProduct() {
        this.props.UpdateProductAction(this.state.product);
    }

    _onRating(rating) {
        this.setState({
            rating: rating
        });
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
    _setName(name) {
        this._name = name;
    }
    _setPrice(price) {
        this._price = price;
    }
    _setDescription(description) {
        this._description = description;
    }

    _renderRating() {
        return (
        <View>
            <View style={{ marginTop: 5, marginHorizontal: 10 }}>

              <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>Product Name</Text>
              </View>

              <View style={{flexDirection:'row',marginTop:10,alignItems:'center',borderWidth:1,borderColor:'grey',borderRadius:4}}>
                  <TextInput style={{marginLeft:3,color:"black",height:35,borderRadius:3,flex:1,backgroundColor:'white'}} placeholder={"Enter product name here"} onChangeText={(t)=>this._setName(t)}/>
              </View>

            </View>
        </View>
        );
    }

    _renderDetailRating() {
        return(
        <View style={{ marginHorizontal: 10,marginTop: 0  }}>
        </View>
        );
    }

    _renderTestResults() {
        return (
        <View style={{ marginHorizontal: 10, marginTop: 0 }}>
        </View>
        );
    }

    _renderDescription() {
        return (
        <View style={{ marginHorizontal: 10, marginTop: 15, marginBottom:10, }}>
            <View style={{ height: 40, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Description</Text>
            </View>
            <View style={{ flexDirection: "row",borderColor: 'gray', borderWidth: 1, margin: 0, borderRadius: 4, }}>
                <TextInput
                    style={{ height: 60, flex:1, margin: 4, fontSize: 16, }}
                    onChangeText={(text) => this._setDescription(text) }
                    placeholder={'Say something'}
                    numberOfLines = {4}
                    multiline = {true}
                />
            </View>
        </View>
        );
    }

    //
    // BatsFix. This is a lot of code for selecting filters should it be moved to a different file?
    //

    _renderEffectFilters() {
        if (this.state.showSlider) {
            return (
            <View style={{flexDirection:'row'}}>
              <View style={{backgroundColor:"#4A90E2",justifyContent:'center',borderRadius:20,marginRight:10}}>
                <Text style={{margin:4,marginHorizontal:15,color:'white',fontSize:16}}>{this._effect[this._selectedFilterIndex].name}</Text>
              </View>
              <View style={{flex:1}}>
                <Slider maximumValue={100} minimumValue={10} value={50} style={{flex:1}} onSlidingComplete={(t)=> this._setEffectValue(t)}/>
              </View>
              <View style={{justifyContent:'center'}}>
                <Text style={{color:'black',fontSize:16}}>  very intense</Text>
              </View>
            </View>
            );
        }
        else {
            return (
            <ScrollView horizontal={true} style={{flex:1}}>
                {this._renderFiltersArray(this._effect)}
            </ScrollView>
            );
        }
    }

    _setEffectValue(value) {
        this._effect[this._selectedFilterIndex].strength = value;
        this.setState({showSlider:false});
    }

    _onAddRemoveFilter(filter) {
        if (filter.type == 'effect') {
            var index = this._effect.indexOf(filter);
            this._effect[index].selected = filter.selected;
            if (filter.selected) {
                // keep in mind this filter.
                this._selectedFilterIndex = index;
                // get the effect strength
                this.setState({showSlider:true});
            }
        }
    }

    _renderFiltersArray(filterArray) {
        var filters = [];
        for (var i=0; i  < filterArray.length; i++) {
            filters.push(<FilterItem filter={filterArray[i]} key={i} onPress={(t) => this._onAddRemoveFilter(t)}/>);
        }
        return filters;
    }

    _renderFilters() {
        return (
        <View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Add Effects</Text>
                </View>
                {this._renderEffectFilters()}
            </View>
            {/* Related activities */}
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Add Activities</Text>
                </View>
                <ScrollView horizontal={true}>
                {this._renderFiltersArray(this._activity)}
                </ScrollView>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Add Symptoms</Text>
                </View>
                <ScrollView horizontal={true}>
                {this._renderFiltersArray(this._symptom)}
                </ScrollView>
            </View>
            <View style={{height:60}}/>
        </View>
        );
    }

}
/*
function mapStateToProps(state) {
    return {
        updated: state.ProductReducer.updated,
    }
}
*/
//Connect to UpdateProductAction
function mapActionToProps(dispatch) { return bindActionCreators({ UpdateProductAction, }, dispatch); }

module.exports = connect(null, mapActionToProps)(UpdateProductScene);


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
