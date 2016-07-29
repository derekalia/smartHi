//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import StarRating from 'react-native-star-rating';
//get internal components
// import Styles from './styles.js';
import {GetRetailerAction,GetProducerAction,} from '../actions';
import RetailerItem from './retaileritem.js';
import ProducerItem from './produceritem.js';
import ReviewSection from './reviewsection.js';

class ProductScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {
            act: this.props.act,
            eff: this.props.eff,
            starCount: 3.5,
            producer: {id:'placeholderProducerId',name:'Forged Cannabis'},
        }
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _goRetailer(retailerId: string) {
        this.props.GetRetailerAction(retailerId);
    }

    _goProducer(producerId: string) {
        this.props.GetProducerAction(producerId);
    }


    _renderRetailer(rowData) {
        return (
            <RetailerItem goRetailer={(retailerId) => this._goRetailer(retailerId)} retailer={rowData}/>
        )
    }

    _renderRetailers() {
        if (this.props.retailers.size !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.retailers) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderRetailer.bind(this) }
                    />
            );
        }
        return null;
    }

    // BatsFix. These should be broken into components later.
    render() {
        return (
            <ScrollView style={{marginTop:50}}>
                <View style={{ flex: 1 }}>
                    {/*Product Image*/}
                    <View style={{ height: 248, justifyContent: "flex-end" }}>
                        <Image source={require('../media/RosinXJ.png') } style={{ height: 190, width: 380 }}/>
                    </View>
                    {/* Overall rating */} 
                    <View style={{ justifyContent: "flex-end", marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>FORGED XJ-13 ROSIN</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                starSize={30}
                                starColor={'red'}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating) }
                                />
                            <Text style={{ fontSize: 19 }}> (403) </Text>
                        </View>
                    </View>
                    {/* Description */} 
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                            <Text>
                                FORGED Rosin Is our process of extracting oils from cannabis.We use very low temperatures to reduce the terpene 
                                evaporation which is critical to the experience of our product.
                            </Text>
                        </View>
                    </View>
                    {/*Rating breakdown*/}
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rating</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                                    <Text style={[{ color: 'black', margin: 7 }]}>Quality</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                                    <Text style={[{ color: 'black', margin: 7 }]}>Flavor</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                                    <Text style={[{ color: 'black', margin: 7 }]}>Potency</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3 }}>
                                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        starSize={30}
                                        starColor={'red'}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating) }
                                        />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        starSize={30}
                                        starColor={'red'}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating) }
                                        />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        starSize={30}
                                        starColor={'red'}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating) }
                                        />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Test results */}
                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Test Results</Text>
                            <Text style={{}}>THC: 13% CBD: 49% THCA: 32% TOTAL CANNABNOIDS: 100%</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>euphoric</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>giggly</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>sleepy</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3 }}>
                                <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: 250 }]}>
                                    <Text style={Styles.tagTextType}> </Text>
                                </View>
                                <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: 190 }]}>
                                    <Text style={Styles.tagTextType}> </Text>
                                </View>
                                <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: 110 }]}>
                                    <Text style={Styles.tagTextType}> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Related activities */}
                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activies</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={Styles.tagType}>
                                <Text style={Styles.tagTextType}>movies</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagType}>
                                <Text style={Styles.tagTextType}>social</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagType}>
                                <Text style={Styles.tagTextType}>hike</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Reviews */}
                    <ReviewSection/>
                    {/* Retailers */}
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Locations</Text>
                        </View>
                        {this._renderRetailers() }
                    </View>
                    {/* Producer item */}
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Company</Text>
                        </View>                        
                        <ProducerItem producer={this.state.producer} onPress={() => this._goProducer(this.state.producer.id)}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


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

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        act: state.ProductReducer.act,
        eff: state.ProductReducer.eff,
        retailers: state.ProductReducer.retailers,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetRetailerAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetRetailerAction,GetProducerAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProductScene);
