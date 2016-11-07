//
// Description: productitem.js
// This contains the declaration for the product item
// It should only contain product item logic and nothing else.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight,ScrollView } from 'react-native';
import {Connect} from 'react-redux';

import StarRating from 'react-native-star-rating';

class ProductItem extends Component {
    constructor(props) {
        super(props);
    }

    _onStarRating(r) {
        //Doesnt do anything but StarRating requires this.
    }
    _renderActivity() {
        //BatsFix. parse this.props.activity to render these.
       var aC = '#48BBEC'; // attribute color
       var aH = 33; // attribute height;
       var aBR = 30; // attribute border radius
       //BatsFix. Wait parsing till licensee and processor info is pulled from graph.cool
       var activities = [];
       //BatsFix. Array.isArray should be removed later once test data is not used anymore
       if (Array.isArray(this.props.product.activity)) {
           activities = this.props.product.activity;
       }
       else
       if (this.props.product.activity != null) {
           activities = this.props.product.activity.split(",");
       }
       var activity=[];
       for (var i=0; i < activities.length; i++) {
            activity.push(
                <TouchableHighlight style={{ borderColor:aC, borderWidth: 1, borderRadius:aBR, height:aH, margin:3, justifyContent:'center'}} key={activities[i]}>
                    <Text style={{fontSize:14, color: aC, alignSelf: 'center',marginHorizontal:10}}>{activities[i]}</Text>
                </TouchableHighlight>
            );
       }
        return (
        <View style={{marginTop:5,width:160}}>
          <ScrollView horizontal={true}>
            {activity}
          </ScrollView>
        </View>
        );
    }
    _renderRating() {
        // BatsFix. fix rating count later.
        var ratingCount = 0;
        var ratings = this.props.product.ratingCount;
        for (var i=0; i < ratings.length; i++) {
            ratingCount += ratings[i]
        }
        return(
        <View style={{  flexDirection: 'row',marginTop:5}}>
            <StarRating disabled={false} maxStars={5} starColor={'red'} starSize={15} rating={this.props.product.rating} selectedStar={(r)=>this.onStarRating(r)}/>
            <Text style={{ fontSize: 14, color: 'black'}}> ({ratingCount}) </Text>
            <View style={{flex: 1,alignItems:'flex-end'}}>
              <Text style={{fontSize: 14,  color:'black'}}>{this.props.product.name}</Text>
            </View>
        </View>
        );
    }
    _renderPrice() {
        if (this.props.product.price == null) {
            return null;
        }
        return (
        <View style={{  flex:1,flexDirection: 'row',}}>
            <View style={{alignItems:'flex-end'}}>
              <Text style={{flex: 1, fontSize: 16, color:'black'}}>${this.props.product.price}/Gram</Text>
            </View>
        </View>
        );
    }
    render() {
        //
        // BatsFix. This needs to be flexible with regard to a device with and height.
        //
        var iH = 100; // image height
        var iW = 100; // image width
        var bM = 5;   // box margin
        var bR = 5;   // box radius
        var fB = 16;  // font big
        var fS = 14;  // font small

        // BatsFix. this should come from the product
        var iS = 'Rosin2.png';
        return (
                <TouchableHighlight style={{backgroundColor:'white'}} onPress={() => this.props.goProduct(this.props.product.id)} underlayColor={'white'}>
                <View>

                    <View style={{flex: 1, flexDirection: 'row', margin: 5,borderWidth:0,borderColor:'#ECECEC',marginHorizontal:10,alignItems:'center'}}>

                            <View style={{  width: 90,height: 90,}}>
                              <Image style={{  width: 90,height: 90, marginRight: 0,borderRadius:4}} source={require('../../media/Rosin2.png')}/>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', padding:5,}}>
                                {/*Product pricing*/}
                                {this._renderPrice()}
                                {/*Product rating*/}
                                {this._renderRating()}
                                {/*Product attributes */}
                                <View style={{flexDirection:'row'}}>
                                {this._renderActivity()}

                                <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                                    <View style={{}}>
                                    <Text style={{color:'#858585'}}>THC: {this.props.product.thc}%</Text>
                                    </View>
                                    <View>
                                    <Text style={{color:'#858585'}}>CBD: {this.props.product.cbd}%</Text>
                                    </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{width:400,height:1,borderWidth:.5,borderColor:'#EBEBEB'}}></View>
                        </View>
                </TouchableHighlight>
        );
    }
}

module.exports = ProductItem;
