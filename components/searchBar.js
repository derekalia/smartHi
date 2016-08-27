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
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.frameId != nextProps.frameId) {
            this.setState({frameId:nextProps.frameId});
        }
    }

    _frameStyle(frameId) {
        if (frameId == this.state.frameId) {
            return Styles.selectedFrame;
        }
        return Styles.normalFrame; 
    }

    _textStyle(frameId) {
        if (frameId == this.state.frameId) {
            return Styles.selectedText;
        }
        return Styles.normalText;
    }

    _setFrame(frameId) {
        this.setState({frameId: frameId});
        this.props.SwitchFrameAction(frameId);
    }

     _onChange(event) {
        this.props.setSearchTerm(event.nativeEvent.text);
    }

    render() {
        return (
             <View style={{top:-555,width:340,justifyContent:'center',left:18}}>
                 <View style={{flexDirection: "row"}}>
                    <View style={[{ flex: 5,}]}>
                      <View style={{height: 34,borderWidth:3,borderColor:'#ECECEC',borderRadius:8,backgroundColor: '#ECECEC',}}>
                        <TextInput style={{marginHorizontal:10,
                          height:28,
                          fontSize: 20,
                          backgroundColor: '#ECECEC',}}
                            autoCapitalize  = "none"
                            autoCorrect     = {false}
                            placeholder     = "Search"
                            returnKeyType   = "next"
                            onChange        = {(e) => this._onChange(e)}
                            clearButtonMode = 'always'
                            />
                            </View>
                    </View>
                    <View style={{flex:.1}}></View>

                        <TouchableOpacity style={{flex: .6,}} onPress={this.props.startSearch}>
                        <View style={[{  borderWidth: 1,justifyContent:'center',borderColor: "#4A90E2", backgroundColor: "#4A90E2", height: 34,borderRadius:8}]}>
                            <Image style={{ height: 20, width: 20,alignSelf:'center', }} source={require("../media/SearchIcon0.png") }/>
                        </View>
                        </TouchableOpacity>

                </View>
               <View style={{flexDirection: "row",
                             marginTop: 15,
                             marginBottom: 2,
                             marginHorizontal: -20,
                             justifyContent:'space-around',
                             alignItems:'center',
                             height:20
                            }}>
                   <TouchableOpacity style={[this._frameStyle(ProductFrameId),{height: 23}]} onPress={()=>this._setFrame(ProductFrameId)}>
                        <Text style={this._textStyle(ProductFrameId)}>PRODUCTS</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[this._frameStyle(RetailerFrameId),{height: 23}]} onPress={()=>this._setFrame(RetailerFrameId)}>
                        <Text style={this._textStyle(RetailerFrameId)}>STORES</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[this._frameStyle(MapFrameId),{height: 23}]} onPress={()=>this._setFrame(MapFrameId)}>
                        <Text style={this._textStyle(MapFrameId)}>MAP</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[this._frameStyle(UserFrameId),,{height: 23}]} onPress={()=>this._setFrame(UserFrameId)}>
                        <Text style={this._textStyle(UserFrameId)}>USERS</Text>
                   </TouchableOpacity>
               </View>
               <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:-40}}>
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
        height: 40,
        marginLeft:7,
        fontSize: 20,
        backgroundColor: 'white',
    },
    normalText: {
        color:"#9B9B9B",
    },
    selectedText: {
        color:"#468EE5",
    },
    normalFrame: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    selectedFrame: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor:"#468EE5",
    },
}
