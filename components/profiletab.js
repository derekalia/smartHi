//
// Description: profilestab.js
// This contains the declaration for the profile tab  of the app
// It should only contain profile scene navigation logic and nothing else.
// 

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Image, TouchableHighlight } from 'react-native';
import {Connect} from 'react-redux';

import StarRating from 'react-native-star-rating';


// Import internals
import ProductItem from './productitem.js';

class ProfileTab extends Component {
    render() {
        return (
                    <ScrollView style={{marginTop:50}}>
                        {/*Image and Location*/}
                        <View style={{alignItems: 'center',}}>
                            <Image source={require('../media/headshot1.png') } style={{ width: 100, height: 100 }}/>
                            <Text style={{ fontSize: 22, margin: 8, fontWeight: "bold" }}>Batman</Text>
                            <Text style={{ fontSize: 18, marginTop: 1 }}>Seattle, WA</Text>
                            <Text style={{ fontSize: 18, marginTop: 8 }}>Instagram: @batman</Text>
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
                                <Text style={{ fontSize: 18 }}> 198 </Text>
                                <Image source={require('../media/Oval129.png') } style={{ width: 25, height: 25 }}/>
                                <Text style={{ fontSize: 18 }}> Points </Text>
                        </View>


                        {/* Reviews and Followers */}
                        <View style={{ alignItems: 'center', marginTop:10, paddingTop:10, borderTopWidth: 1, borderColor: '#dddddd'}}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <View style={{ flex: 1, alignItems: 'center',borderRightWidth: 2, borderColor: '#dddddd'}}>
                                    <Text style={{ fontSize: 18 }}> 23 </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Reviews </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center'}}>
                                    <Text style={{ fontSize: 18 }}> 89 </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Followers </Text>
                                </View>
                            </View>
                        </View>
                        {/* Favorites */}
                        {/*<View style={{ alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderColor: '#dddddd',}}/>*/}

                        <View style={{ marginTop: 10, borderTopWidth: 1, borderColor: '#dddddd', }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Favorites</Text>
                            <ProductItem/>
                        </View>
                    </ScrollView>


        );
    }
}

module.exports = ProfileTab;
