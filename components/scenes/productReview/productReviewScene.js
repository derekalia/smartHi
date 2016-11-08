//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, Dimensions,} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


import {RateProductAction,GetProductAction,GetProfileAction,} from '../../../actions';
import StarRating from 'react-native-star-rating';

import FilterItem   from '../../util/filterItem.js';
import ProductItem   from '../../util/productItem.js';
import {HerbyLoading,HerbyBar} from '../../../common/controls.js';
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../../../common/filters.js';

class ProductReviewScene extends Component {
    constructor(props) {
        super(props);
    }
    _getUser() {
        //BatsFix. add call to GetUserActionProfile here
        this.props.GetProfileAction(1);
    }
    render() {
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }
        console.log("printing productReview");
        console.log(this.props.productReview);
        return (
        <View style={{flex:1}}>
        <HerbyBar name="Review Details"  navigator={this.props.navigator}/>
        <ScrollView style={{flex:1, backgroundColor:'white',marginBottom:50}}>
            <View style={{ flex: 1 }}>
                <ProductItem product = {this.props.productReview.product} goProduct={(t)=>this.props.GetProductAction(t)}/>

                {this._renderCommentBox()}

                {this._renderRating()}

                {this._renderDetailRating()}

                {this._renderFilters()}

            </View>
        </ScrollView>
        </View>
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
                            rating={this.props.productReview.quality}
                            selectedStar={(rating) => this._onQuality(rating)}/>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.props.productReview.flavor}
                            selectedStar={(rating) => this._onFlavor(rating)}/>
                   </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                        <StarRating disabled={false} maxStars={5} starSize={30} starColor={'#D0021B'}
                            rating={this.props.productReview.potency}
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
            <TouchableOpacity style={{flex:.25}} onPress={()=>this._getUser()}>
                <Image style={{height:60,width:60}} source={require('../../../media/headshot1.png') }/>
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

    _renderFiltersStrength(filterArray) {
        var filters = [];
        for (var i=0; i  < filterArray.length; i++) {
            var entry = filterArray[i];
            var ratio = entry.strength*2; 
            filters.push(
            <TouchableOpacity 
                style ={{width:ratio,margin: 5, borderRadius: 20, height: 40, borderWidth: 1, justifyContent: 'center', alignItems:'center',backgroundColor:'blue'}}
                key={i}
                >
                <Text style={{marginTop:10,marginBottom:10,marginHorizontal:15,color:'white'}}>
                </Text>
            </TouchableOpacity>
            );
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
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{borderRightWidth:2, borderColor:'blue',paddingRight:10,marginRight:10}}>
                        {this._renderFiltersArray(this._effect)}
                    </View>
                    <View style={{flex:1}}>
                        {this._renderFiltersStrength(this._effect)}
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activities</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                {this._renderFiltersArray(this._activity)}
                </View>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                <View style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Symptoms</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                {this._renderFiltersArray(this._symptom)}
                </View>
            </View>
        </View>
        );
    }

}


// Connect to RateProductAction.

function mapActionToProps(dispatch) { return bindActionCreators({ RateProductAction,GetProductAction,GetProfileAction, }, dispatch); }

//
// BatsFix. Attach apollo query to the component. This creates props loading and products on HomeScene
//
const apolloProductReview = gql`query($itemId: ID!) {
    ProductReview(id:$itemId){
      id,
      name,
      comment,
      rating,
      activity,
      effect,
      symptom,
      user {id,name,score,image},
      product {id, name, rating, ratingCount, activity, thc, thca, cbd, image },
    }
}`;
//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        error:  data.error,
        loading: data.loading,
        productReview: data.ProductReview,
    });
}

module.exports = graphql(apolloProductReview,{props:mapDataToProps})(connect(null,mapActionToProps)(ProductReviewScene));

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
