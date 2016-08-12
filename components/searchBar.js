//
// Description: searchbar.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {ProductFrameId, MapFrameId, UserFrameId, RetailerFrameId, }   from '../common/const.js';
import {SwitchFrameAction}   from '../actions';


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {frameId:this.props.frameId};
        this.ProductFrameId = Styles.category;
        this.MapFrameId = Styles.category;
        this.UserFrameId = Styles.category;
        this.RetailerFrameId = Styles.category;
        this[this.props.frameId] = Styles.category2;
    }

    _frameStyle(frameId) {
        return this[frameId];
    }

    _setFrame(frameId) {
        //
        // Change previous frameId to normal style
        //
        this[this.state.frameId] = Styles.category;

        //
        // Set new frameId to highlight
        //
        this[frameId] = Styles.category2;

        this.setState({frameId: frameId});
        this.props.SwitchFrameAction(frameId);
    }

     _onChange(event) {
        this.props.setSearchTerm(event.nativeEvent.text);
    }

    render() {
        return (
             <View style={{position:'absolute',top:20,left:0,right:0}}>
                 <View style={{flexDirection: "row", marginTop: 0, marginBottom: 0, marginHorizontal: 10,}}>
                    <View style={[{ flex: 5,}]}>
                    <View style={{height: 50,borderWidth:1,borderColor:'#4A90E2',borderTopLeftRadius:6,borderBottomLeftRadius:6,}}>
                        <TextInput style={[Styles.input]}
                            autoCapitalize  = "none"
                            autoCorrect     = {false}
                            placeholder     = "Keyword"
                            returnKeyType   = "next"
                            onChange        = {(e) => this._onChange(e)}
                            clearButtonMode = 'always'
                            />
                            </View>
                    </View>
                    <View style={[{ flex: 1, borderWidth: 1, borderColor: "#4A90E2", backgroundColor: "#4A90E2", height: 50,borderTopRightRadius:6,borderBottomRightRadius:6 }]}>
                        <TouchableOpacity style={{}} onPress={this.props.startSearch}>
                            <Image style={{ height: 32, width: 32, marginLeft: 13, marginTop: 8 }} source={require("../media/SearchIcon0.png") }/>
                        </TouchableOpacity>
                    </View>
                </View>
               <View style={{flexDirection: "row", 
                             marginTop: 20, 
                             marginBottom: 0, 
                             marginHorizontal: 10,
                             justifyContent:'space-around',
                             alignItems:'center',
                            }}>
                   <TouchableOpacity style={this._frameStyle(ProductFrameId)} onPress={()=>this._setFrame(ProductFrameId)}>
                        <Text>Products</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={this._frameStyle(RetailerFrameId)} onPress={()=>this._setFrame(RetailerFrameId)}>
                        <Text>Stores</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={this._frameStyle(MapFrameId)} onPress={()=>this._setFrame(MapFrameId)}>
                        <Text>Map</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={this._frameStyle(UserFrameId)} onPress={()=>this._setFrame(UserFrameId)}>
                        <Text>Users</Text>
                   </TouchableOpacity>
               </View>
           </View>
        );
    }
}

//
// Connect SwitchFrameAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchFrameAction }, dispatch); }

module.exports = connect(null,mapActionToProps)(SearchBar);

const Styles={
    input: {
        height: 45,
        marginLeft:7,
        fontSize: 20,
        backgroundColor: 'white',
    },
    category: {
        height: 23,
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    category2: {
        height: 23,
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
}
