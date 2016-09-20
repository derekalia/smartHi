//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, Dimensions,} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {RateProductAction,} from '../actions';
import StarRating from 'react-native-star-rating';

import FilterItem   from './filterItem.js';
import ProductItem   from './productItem.js';
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../common/filters.js';

class ProductReviewScene extends Component {
    constructor(props) {
        super(props);
        this.state = {product:this.props.item.product,review:this.props.item.review};
        this._effect = [];
        this._symptom = [];
        this._activity = [];
        var filters = this.state.review.effect;
        //BatsFix. Should really have a constructor for filter...
        for (var i=0; i < filters.length; i++) {
            var filter = filters[i];
            this._effect.push({name:filter.name,strength:filter.strength,type:'effect',selected:true});
        }
        filters = this.state.review.symptom;
        for (var i=0; i < filters.length; i++) {
            var name = filters[i];
            this._symptom.push({name:name,type:'symptoms',selected:true});
        }
        filters = this.state.review.activity;
        for (var i=0; i < filters.length; i++) {
            var name = filters[i];
            this._activity.push({name:name,type:'activity',selected:true});
        }
    }

    render() {
        return (
        <ScrollView style={{flex:1, backgroundColor:'white'}}>
            <View style={{ flex: 1 }}>
                <ProductItem product = {this.props.item.product}/>

                {this._renderCommentBox()}

                {this._renderRating()}

                {this._renderDetailRating()}

                {this._renderFilters()}

            </View>
        </ScrollView>
        );
    }

    //BatsFix. For now do nothing.
    _onRating(rating) {
    }
    _onQuality(rating) {
    }
    _onFlavor(rating) {
    }
    _onPotency(rating) {
    }

    _renderRating() {
        return (
        <View>
            <View style={{ marginTop: 5, marginHorizontal: 10,flexDirection: "row" }}>
                <View style={{flex:1.2,alignItems: 'flex-start', flexDirection: "row",marginTop:8}}>
                    <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                        rating={this.state.review.rating}
                        selectedStar={(rating) => this._onRating(rating)}/>
                </View>
            </View>
        </View>
        );
    }

    _renderDetailRating() {
        return(
        <View style={{ marginHorizontal: 10,marginTop: 15  }}>
            <View style={{ height: 40, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Rating</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, }}>
                    <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                        <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Quality</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                        <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Flavor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Styles.tagType, { borderColor: 'white', alignItems: 'flex-start' }]}>
                        <Text style={[{ color: 'black', margin: 5,fontSize:16 }]}>Potency</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.state.review.quality}
                            selectedStar={(rating) => this._onQuality(rating)}/>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.state.review.flavor}
                            selectedStar={(rating) => this._onFlavor(rating)}/>
                   </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.state.review.potency}
                            selectedStar={(rating) => this._onPotency(rating)}/>
                   </View>
                </View>
            </View>
        </View>
        );
    }

    _renderCommentBox() {
        return (
        <View style={{ marginHorizontal: 10, marginTop: 15, marginBottom:10,flexDirection:'row' }}>
            <TouchableOpacity style={{flex:.25}} onPress={()=>this.props.getUser(this.props.user.id)}>
                <Image style={{height:60,width:60}} source={require('../media/headshot1.png') }/>
            </TouchableOpacity>
            <View style={{ borderWidth: 0, margin: 2,flex:1,backgroundColor:'transparent'}}>
                <Text>{this.state.review.comment}</Text>
            </View>
        </View>
        );
    }

    _renderFiltersArray(filterArray) {
        var filters = [];
        for (var i=0; i  < filterArray.length; i++) {
            filters.push(<FilterItem filter={filterArray[i]} key={i} onPress={(t) => this._onAddRemoveFilter(t)}/>);
        }
        return filters;
    }

    _renderFilters() {
        return (
        <View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                </View>
                <View style={{flex:1}}>
                {this._renderFiltersArray(this._effect)}
                </View>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activities</Text>
                </View>
                {this._renderFiltersArray(this._activity)}
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Symptoms</Text>
                </View>
                {this._renderFiltersArray(this._symptom)}
            </View>
        </View>
        );
    }

}


// Connect to RateProductAction.

function mapActionToProps(dispatch) { return bindActionCreators({ RateProductAction, }, dispatch); }

module.exports = connect(null, mapActionToProps)(ProductReviewScene);


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
    tagType: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F7A700",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#F7A700",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagCategory: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#7BD500",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextCategory: {
        color: "#7BD500",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },


    tagEffect: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextEffect: {
        color: "#4A90E2",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagActivity: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BE00E3",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextActivity: {
        color: "#BE00E3",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
    },

    tagSymptom: {
        margin: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ED3C52",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptom: {
        color: "#ED3C52",
        marginTop: 7,
        marginBottom: 7,
        marginHorizontal: 10,
        fontSize:16,
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
