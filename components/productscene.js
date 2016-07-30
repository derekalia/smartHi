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
import RetailerItem from './retailerItem.js';
import ProducerItem from './producerItem.js';
import ReviewList   from './reviewList.js';

class ProductScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {
            reviewCount: 403,
            rating: 3.5,
            quality: 4,
            potency: 3,
            flavor: 3,
            thc: 13,
            cbd: 35,
            thca: 52,
            effect: [{name:'giggly',strength:110},{name:'happy',strength:250},{name:'sound',strength:200}],
            activity: ['movies','social','hike'],
            name: 'FORGED XJ-13 ROSIN',
            description:'FORGED Rosin. We use very low temperatures to reduce the terpene  evaporation which is critical to the experienc of our product.',
            producer: {id:'placeholderProducerId',name:'Forged Cannabis'},
        }
    }

    _onRatingPress(rating) {
        this.setState({
            rating: rating
        });
    }
    _onQuality(rating) {
        this.setState({
            quality: rating
        });
    }
    _onPotency(rating) {
        this.setState({
            potency: rating
        });
    }
    _onFlavor(rating) {
        this.setState({
            flavor: rating
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

    // BatsFix. There should be no hardcode items in render! 
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
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.state.name}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                starSize={30}
                                starColor={'red'}
                                rating={this.state.rating}
                                selectedStar={(rating) => this._onRating(rating) }
                                />
                            <Text style={{ fontSize: 19 }}> ({this.state.reviewCount}) </Text>
                        </View>
                    </View>
                    {/* Description */} 
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                            <Text>
                                {this.state.description}
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
                                        disabled={false}
                                        maxStars={5}
                                        starSize={30}
                                        starColor={'red'}
                                        rating={this.state.quality}
                                        selectedStar={(rating) => this._onQuality(rating) }
                                        />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={30}
                                        starColor={'red'}
                                        rating={this.state.flavor}
                                        selectedStar={(rating) => this._onFlavor(rating) }
                                        />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={30}
                                        starColor={'red'}
                                        rating={this.state.potency}
                                        selectedStar={(rating) => this._onPotency(rating) }
                                        />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Test results */}
                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Test Results</Text>
                            <Text style={{}}>THC: {this.state.thc}% CBD: {this.state.cbd}% THCA: {this.state.thca}% TOTAL CANNABNOIDS: 100%</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.effect[0].name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.effect[1].name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.tagType}>
                                    <Text style={Styles.tagTextType}>{this.state.effect[2].name}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3 }}>
                                <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: this.state.effect[0].strength }]}>
                                    <Text style={Styles.tagTextType}> </Text>
                                </View>
                                <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: this.state.effect[1].strength }]}>
                                    <Text style={Styles.tagTextType}> </Text>
                                </View>
                                <View style={[Styles.tagType, { backgroundColor: '#BD10E0', width: this.state.effect[2].strength }]}>
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
                                <Text style={Styles.tagTextType}>{this.state.activity[0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagType}>
                                <Text style={Styles.tagTextType}>{this.state.activity[1]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagType}>
                                <Text style={Styles.tagTextType}>{this.state.activity[2]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Reviews */}
                    <ReviewList/>
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
