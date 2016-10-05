//
// Description: productitem.js
// This contains the declaration for the product item
// It should only contain product item logic and nothing else.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import {Connect} from 'react-redux';

import StarRating from 'react-native-star-rating';

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.product;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.props.product);
    }

    _onStarRating(r) {
        //Doesnt do anything but StarRating requires this.
    }

    render() {
        //
        // BatsFix. This needs to be flexible with regard to a device with and height.
        //
        var iH = 100; // image height
        var iW = 100; // image width
        var bM = 5;   // box margin
        var bR = 5;   // box radius
        var fB = 18;  // font big
        var fS = 13;  // font small
        var aC = '#48BBEC'; // attribute color
        var aH = 36; // attribute height;
        var aBR = 22; // attribute border radius

        // BatsFix. this should come from the product
        var iS = 'Rosin2.png';
        return (
                <TouchableHighlight onPress={() => this.props.goProduct(this.state.id)} underlayColor={'white'}>
                    <View style={{flex: 1, flexDirection: 'row', margin: 5,borderWidth:1,borderColor:'#ECECEC', borderRadius: bR,marginHorizontal:10}}>
                          <View style={{  width: iW,height: iH,borderRadius:10,}}>
                            <Image style={{  width: iW,height: iH, marginRight: bM}} source={require('../../media/Rosin2.png')}/>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', padding:5,}}>
                                {/*Product pricing*/}
                                <View style={{  flexDirection: 'row',}}>
                                    <Text style={{flex: 1, fontSize: fB, fontWeight: 'bold', color:'black'}}>{this.state.name}</Text>
                                    <View style={{alignItems:'flex-end'}}>
                                      <Text style={{flex: 1, fontSize: fB, color:'black'}}>${this.state.price}</Text>
                                    </View>
                                </View>
                                {/*Product rating*/}
                                <View style={{  flexDirection: 'row',marginTop:5}}>
                                    <StarRating disabled={false} maxStars={5} starColor={'red'} starSize={15} rating={this.state.rating} selectedStar={(r)=>this.onStarRating(r)}/>
                                    <Text style={{ fontSize: fS, color: 'black'}}> ({this.state.ratingCount}) </Text>
                                    <View style={{flex: 1,alignItems:'flex-end'}}>
                                      <Text style={{fontSize: fS,  color:'black'}}>{this.state.name}</Text>
                                    </View>
                                </View>
                                {/*Product attributes */}
                                <View style={{flexDirection: 'row',marginTop:5}}>
                                    <TouchableHighlight style={{flex:1, borderColor:aC, borderWidth: 1, borderRadius:aBR, height:aH, margin:3, justifyContent:'center'}}>
                                        <Text style={{fontSize:fS, color: aC, alignSelf: 'center'}}>{this.state.activity[0]}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{flex:1,borderColor: aC, borderWidth: 1, borderRadius:aBR, height:aH, margin:3, justifyContent:'center'}}>
                                        <Text style={{fontSize:fS, color: aC, alignSelf:'center'}}>{this.state.activity[1]}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{flex:1, borderColor:aC, borderWidth: 1, borderRadius:aBR, height:aH, margin:3, justifyContent:'center'}}>
                                        <Text style={{fontSize:fS, color: aC, alignSelf:'center'}}>{this.state.activity[2]}</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                </TouchableHighlight>
        );
    }
}

module.exports = ProductItem;