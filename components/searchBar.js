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

    componentWillReceiveProps(nextProps) {
        if (this.state.frameId != nextProps.frameId) {
            this._setFrame(frameId);
        }
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
                            placeholder     = "Keyword"
                            returnKeyType   = "next"
                            onChange        = {(e) => this._onChange(e)}
                            clearButtonMode = 'always'
                            />
                            </View>
                    </View>
                    <View style={{flex:.1}}></View>
                    <View style={[{ flex: .6, borderWidth: 1,justifyContent:'center',borderColor: "#4A90E2", backgroundColor: "#4A90E2", height: 34,borderRadius:8}]}>
                        <TouchableOpacity style={{}} onPress={this.props.startSearch}>
                            <Image style={{ height: 20, width: 20,alignSelf:'center', }} source={require("../media/SearchIcon0.png") }/>
                        </TouchableOpacity>
                    </View>
                </View>
               <View style={{flexDirection: "row",
                             marginTop: 15,
                             marginBottom: 0,
                             marginHorizontal: -20,
                             justifyContent:'space-around',
                             alignItems:'center',
                            }}>
                   <TouchableOpacity style={this._frameStyle(ProductFrameId)} onPress={()=>this._setFrame(ProductFrameId)}>
                        <Text>PRODUCTS</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={this._frameStyle(RetailerFrameId)} onPress={()=>this._setFrame(RetailerFrameId)}>
                        <Text>STORES</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={this._frameStyle(MapFrameId)} onPress={()=>this._setFrame(MapFrameId)}>
                        <Text>MAP</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={this._frameStyle(UserFrameId)} onPress={()=>this._setFrame(UserFrameId)}>
                        <Text>USERS</Text>
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
