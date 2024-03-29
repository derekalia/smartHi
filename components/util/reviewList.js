//
// Description: reviewsection.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider,ListView, ListViewDataSource,TouchableHighlight, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

import StarRating from 'react-native-star-rating';

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ReviewTabId} from '../../common/const.js';
import {SwitchTabAction,GetProductReviewAction} from '../../actions';

class ReviewItem extends Component {
    constructor(props) {
        super(props);
        if (this.props.reviewItem == null) {
            this.state={
                id: 'somefakeid',
                time: '2 hours ago',
                name: 'Good',
                comment: 'This is a comment.',
                rating: 4,
                user: {
                    id: "test",
                    name: "testUser"
                }
            }
        }
        else {
            this.state = this.props.reviewItem;
        }
    }
    _onRating(t) {
    }

    render () {
        // BatsFix. there should be no hard coded content here.
        console.log(this.props.reviewItem);
        return (
            <View style={Styles.row} style={{ margin: 2, marginTop: 15, flex: 1 }}>
            <TouchableOpacity onPress={()=>this.props.goReview(this.state.id)}>
                <View style={Styles.row}>
                    <View style={{ height: 30, width: 30, borderWidth: 15, borderColor: 'lightblue', marginRight: 10 }}></View>
                    <View style={Styles.column}>
                      <View style={Styles.row}>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: -2,marginRight:10 }}>
                            {this.state.user.name}
                        </Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={15}
                            starColor={'red'}
                            rating={this.state.rating}
                            selectedStar={(t)=>this._onRating(t)}
                            />
                            </View>
                        <Text style={{ fontSize: 13 }}>
                            {this.state.time}
                        </Text>

                    </View>
                </View>

                <Text style={{ fontSize: 14, marginTop: 8 }}>
                    {this.state.comment}
                </Text>
                </TouchableOpacity>
                <View style={Styles.row}>
                    <Text style={{ fontSize: 13, marginTop: 8 }}>2 </Text>
                    <TouchableHighlight>
                        <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 15 }}source={require('../../media/up1.png') }/>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 20, marginRight: 15 }}source={require('../../media/down1.png') }/>
                    </TouchableHighlight>
                    <TouchableHighlight><Text style={{ fontSize: 13, marginTop: 6, fontWeight: 'bold' }}> Reply </Text></TouchableHighlight>
                </View>
            </View>
        );
    }
}

class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {text:' Say something here'};
    }
    _goRate() {
        //BatsFix. This should go to rate tab???
        //What happens with producers, retailers?
        this.props.SwitchTabAction(ReviewTabId);
    }
    _goReview(id) {
        this.props.GetProductReviewAction(id);
    }
    _getReviewItems() {
        if (this.props.reviewList == null) {
            return(
                <View style={Styles.column}>
                <ReviewItem goReview={(id)=>this._goReview(id)}/>
                <ReviewItem goReview={(id)=>this._goReview(id)}/>
                <ReviewItem goReview={(id)=>this._goReview(id)}/>
                </View>
            );
        }
        var reviews = [];
        for (var i=0; i < this.props.reviewList.length; i++) {
            reviews.push(
                <ReviewItem goReview={(id)=>this._goReview(id)} reviewItem={this.props.reviewList[i]} key={this.props.reviewList[i].id}/>
            );
        }
        return (
            <View style={Styles.column}>
                {reviews}
            </View>
        );
    }
    render() {
        return (
           <View style={{ marginHorizontal: 10, marginTop: 0}}>
               <View style={{flex:1,marginBottom:10 }}>
               <TouchableOpacity style={{  margin: 4, marginTop:20,
                 borderRadius: 10,
                 borderWidth: 1,
                 borderColor: "#ED3C52",
                 backgroundColor: '#ED3C52',
                 justifyContent: 'center',
                 alignItems: 'center'}}
                 onPress={()=>this._goRate()}
                 >
                   <Text style={{color: "white",fontWeight:'bold',fontSize:16,
                   marginTop: 7,
                   marginBottom: 7,
                   marginHorizontal: 10,}}> Rate Item </Text>
               </TouchableOpacity>
               </View>

               <View style={{ justifyContent: 'center' }}>
                   <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reviews</Text>
               </View>

               {/*Review Items*/}
               {this._getReviewItems()}
            </View>
        );
    }
}

//
// Connect SwitchTabAction,GetProductReviewAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchTabAction,GetProductReviewAction, }, dispatch); }

module.exports = connect(null,mapActionToProps)(ReviewList);

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
