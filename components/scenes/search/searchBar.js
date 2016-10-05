//
// Description: searchbar.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {ProductFrameId, MapFrameId, UserFrameId, RetailerFrameId, }   from '../../../common/const.js';
import {SwitchFrameAction}   from '../../../actions';


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
             <View style={{top:-900,justifyContent:'flex-start',alignSelf:'flex-start',alignItems:'flex-start',backgroundColor:'white'}}>
                 <View style={{flexDirection: "row",marginHorizontal:8}}>
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
                            <Image style={{ height: 32, width: 32,alignSelf:'center', }} source={require("../../../media/plusButton11.png") }/>
                        </TouchableOpacity>
                </View>

                 <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:-3,height:42,shadowColor: "#000000",
                 shadowOpacity: 0.3,
                 shadowRadius: 2,
                 shadowOffset: {
                   height: 3,
                   width: 0}}}>

                 <View style={[this._frameStyle(ProductFrameId),{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }]}>
                     <TouchableOpacity style={[{flexDirection: "row",alignItems:'center'}]} onPress={()=>this._setFrame(ProductFrameId)}>
                          <Text style={[this._textStyle(ProductFrameId)]}>PRODUCTS</Text>
                     </TouchableOpacity>
                 </View>

                 <View style={[this._frameStyle(RetailerFrameId),{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }]}>
                     <TouchableOpacity style={[{flexDirection: "row",alignItems:'center'}]} onPress={()=>this._setFrame(RetailerFrameId)}>
                         <Text style={[this._textStyle(RetailerFrameId)]}>STORES</Text>
                     </TouchableOpacity>
                 </View>

                 <View style={[this._frameStyle(MapFrameId),{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }]}>
                     <TouchableOpacity style={[{flexDirection: "row",alignItems:'center'}]} onPress={()=>this._setFrame(MapFrameId)}>
                         <Text style={[this._textStyle(MapFrameId)]}>MAP</Text>
                     </TouchableOpacity>
                 </View>

                 <View style={[this._frameStyle(UserFrameId),{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }]}>
                     <TouchableOpacity style={[{flexDirection: "row",alignItems:'center'}]} onPress={()=>this._setFrame(UserFrameId)}>
                         <Text style={[this._textStyle(UserFrameId)]}>USERS</Text>
                     </TouchableOpacity>
                 </View>
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
      fontSize:14,
        color:"#9B9B9B",
    },
    selectedText: {
      fontSize:14,
      color:"#468EE5",
    },
    normalFrame: {

        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    selectedFrame: {
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor:"#468EE5",
        top:1
    },
}
