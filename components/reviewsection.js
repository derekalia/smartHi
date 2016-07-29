//
// Description: reviewsection.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

class ReviewItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            userName: 'Sue',
            time: '2 hours ago',
            comment: 'This is a comment. Dont give Farzad cookies. Cookie monster is dangerous!'
        }
    }
    render () {
        // BatsFix. there should be no hard coded content here.
        return (
            <View style={Styles.row} style={{ margin: 2, marginTop: 15, flex: 1 }}>
                <View style={Styles.row}>
                    <View style={{ height: 30, width: 30, borderWidth: 15, borderColor: 'lightblue', marginRight: 10 }}></View>
                    <View style={Styles.column}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: -2 }}>
                            {this.state.userName} 
                        </Text>
                        <Text style={{ fontSize: 13 }}>
                            {this.state.time} 
                        </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 14, marginTop: 8 }}>
                    {this.state.comment}
                </Text>
                <View style={Styles.row}>
                    <Text style={{ fontSize: 13, marginTop: 8 }}>2 </Text>
                    <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 15 }}source={require('../media/up1.png') }/>
                    <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 20, marginRight: 15 }}source={require('../media/down1.png') }/>
                    <Text style={{ fontSize: 13, marginTop: 8, fontWeight: 'bold' }}> Reply </Text>
                </View>
            </View>
        );
    }
}

class ReviewSection extends Component {
    constructor(props) {
        super(props);
        this.state = {text:'Say something here'};
    }

    render() {
        return (
           <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Reviews</Text>
                </View>
                <View style={Styles.column}>
                    <View style={Styles.row}>
                        <TextInput
                            style={{ height: 30, width: 345, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 4, fontSize: 15 }}
                            onChangeText={(text) => this.setState({ text }) }
                            value={this.state.text}
                            placeholder={'Say something'}
                            />
                    </View>
                    <ReviewItem/>
                    <ReviewItem/>
                    <ReviewItem/>
                </View>
            </View>
        );
    }
}

module.exports = ReviewSection;

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
});
