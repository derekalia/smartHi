//
// Description: profilescene.js
// This contains the declaration for the profile scene  of the app
// 

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StarRating from 'react-native-star-rating';


// Import internals
import {GetProductAction,SwitchSceneAction,} from '../actions';
import {SettingsSceneId,} from '../common/const.js';
import ProductItem from './productItem.js';

class ProfileScene extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = this.props.user;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.user);
    }

    _goProduct(productId) {
        //
        // BatsFix. Change this after deciding whether product should be on a specific tab.
        this.props.GetProductAction(productId, true);
    }

    _goSettings() {
        this.props.SwitchSceneAction(SettingsSceneId);
    }

    render() {
        // BatsFix. nothing below should be hardcoded!
        return (
                <View style={{flex:1}}>
                    <TouchableOpacity style={{height:60,paddingTop:20,backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}} 
                       onPress={()=>this._goSettings()}>
                        <View style={{ flex: 1, marginTop: 11,marginBottom: 5, flexDirection: "row", justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 13, }}>
                            <Text style={{ fontSize: 18, color: "#007AFF" }}> Settings</Text>
                        </View>
                    </TouchableOpacity>
                    <ScrollView style={{marginTop:0}}>
                        {/*Image and Location*/}
                        <View style={{alignItems: 'center',}}>
                            <Image source={require('../media/headshot1.png') } style={{ width: 100, height: 100 }}/>
                            <Text style={{ fontSize: 22, margin: 8, fontWeight: "bold" }}>{this.state.name}</Text>
                            <Text style={{ fontSize: 18, marginTop: 1 }}>{this.state.address}</Text>
                            <Text style={{ fontSize: 18, marginTop: 8 }}>{this.state.instagram}</Text>
                        </View>

                        {/* Line */}

                        {/* Points entry */}
                        <View style={{ flexDirection: 'row',
                                       marginTop:10,
                                       paddingTop: 10, 
                                       paddingBottom: 10, 
                                       borderTopWidth: 1, 
                                       borderColor: '#dddddd', 
                                       alignItems:'center',
                                       justifyContent:'center',}}>
                                <Text style={{ fontSize: 18 }}> {this.points} </Text>
                                <Image source={require('../media/Oval129.png') } style={{ width: 25, height: 25 }}/>
                                <Text style={{ fontSize: 18 }}> Points </Text>
                        </View>


                        {/* Reviews and Followers */}
                        <View style={{ alignItems: 'center', marginTop:10, paddingTop:10, borderTopWidth: 1, borderColor: '#dddddd'}}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <View style={{ flex: 1, alignItems: 'center',borderRightWidth: 2, borderColor: '#dddddd'}}>
                                    <Text style={{ fontSize: 18 }}> {this.state.ratingCount} </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Reviews </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center'}}>
                                    <Text style={{ fontSize: 18 }}> {this.state.followerCount} </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Followers </Text>
                                </View>
                            </View>
                        </View>

                        {/* Favorites */}
                        <View style={{ marginTop: 10, borderTopWidth: 1, borderColor: '#dddddd', }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Favorites</Text>
                            <ProductItem product={this.props.favorite} goProduct={(id) => this._goProduct(id) }/>
                        </View>
                    </ScrollView>
            </View>
        );
    }
}

// This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
        favorite:  state.NewsReducer.trending,
    }
}
//  This function is used to convert action to props passed to this component.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,SwitchSceneAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProfileScene);
