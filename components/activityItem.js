//
// Description: activityitem.js
// This contains the declaration for an activity item
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

class ActivityItem extends Component {
    _goActivity() {
        this.props.goActivity(this.props.activity);
    }
    render() {
        var aW = 170;
        var aH = 170;
        //
        // BatsFix. React-native apparently does not allow
        // dynamic image sourcings. So all images need to be
        // preloaded...
        //
        var imageTile =  [ require('../media/musicTile1.png'),
                           require('../media/movieTile1.png'),
                           require('../media/exerciseTile1.png'),
                           require('../media/createTile11.png'),
                           require('../media/movieTile1.png'),
                           require('../media/exerciseTile1.png'),
                           require('../media/createTile11.png'),
                           require('../media/createTile11.png'),
                           require('../media/movieTile1.png'),
                           require('../media/exerciseTile1.png'),
                         ];
                         
        return (
            <TouchableOpacity style={{marginLeft:10,marginTop:10}} onPress={()=> this._goActivity()}>
                <Image style={{ width: aW, height: aH, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} source={imageTile[this.props.imageIndex]}>
                    <View style={{ borderWidth: 1.5, borderRadius: 20, borderColor: "white" }}>
                        <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: "black", fontSize: 20, color: "white", margin: 8 }}>
                            {this.props.activity}
                        </Text>
                    </View>
                </Image>
            </TouchableOpacity>
        );
    };
}
module.exports = ActivityItem;
