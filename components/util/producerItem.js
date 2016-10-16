//
// Description: produceritem.js
// This contains the declaration for the producer item
// It should only contain producer item logic and nothing else.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import {Connect} from 'react-redux';

import StarRating from 'react-native-star-rating';

class ProducerItem extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = this.props.producer;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.producer);
    }

    render() {
        //
        // BatsFix. There should be no hard coded value below here
        //
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                height:90,
                marginBottom: 10,marginTop:10,backgroundColor:'transparent'
            }} onPress={()=> this.props.goProducer(this.state.id)}>
                <Image style={Styles.bg} source={require('../../media/forged1.png') } />
                <View style={{ flexDirection: 'column', margin: 4,marginHorizontal:6 }}>

                    <View style={{flex:2,justifyContent:'flex-end',alignItems:"flex-end",alignSelf:"flex-end"}}>
                        <Text style={{
                          alignSelf:"flex-start",
                            color: 'white',
                            fontSize: 22,
                            textShadowOffset: { width: 1.5, height: 1.5 },
                            textShadowColor: 'black',
                            textShadowRadius: 4}}>
                            {this.state.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 3}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={24}
                                starColor={'red'}
                                rating={this.state.rating}
                                selectedStar={(rating) => this.onStarRatingPress(rating) }
                                />
                                <Text style={{
                                    color: "white",
                                    fontSize: 20,
                                    textShadowOffset: { width: 1.5, height: 1.5 },
                                    textShadowColor: 'black',
                                    textShadowRadius: 4}}>
                                    (10)
                                </Text>
                    </View>
                    <Text style={{
                        marginTop:5,
                        color: 'white',
                        fontSize: 16,
                        textShadowOffset: { width: 1.5, height: 1.5 },
                        textShadowColor: 'black',
                        textShadowRadius: 4
                    }}>{this.state.address}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = ProducerItem;

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
})
