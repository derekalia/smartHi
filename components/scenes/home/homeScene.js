//
// Description: homescene.js
// This contains the declaration home scene, containing latest news,
// staff picks, trending topics etc. Included topics should have their
// own file and included here as a class only similar to Activities and
// ProductItem.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableHighlight } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


//get internal components
import ActivityList     from '../../util/activityList.js';
import ProductItem      from '../../util/productItem.js';
import {GoSearchAction, GetProductAction} from '../../../actions';

import {HerbyLoading} from '../../../common/controls.js';

class HomeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {activityCount: 6};
    }

    _goProduct(productId) {
        //
        // Go to product page
        //
       this.props.GetProductAction(productId);
    }

    render() {
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }
        console.log(this.props.products);
        return (
            <View style={[{flex: 1,backgroundColor:'#ECECEC' }]}>
                <ScrollView>

                    {/* Activities */}
                    {/* Section Header */}
                    <View style={{backgroundColor:'white',paddingBottom:15,paddingTop:10,margin:6}}>
                    <View style={{ alignItems: 'flex-end', marginLeft: 5,flexDirection:'row',justifyContent: 'flex-start',marginBottom:0 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Activity </Text>
                    </View>
                    <ActivityList count={this.state.activityCount}/>
                    </View>

                    {/* Staff Picks */}
                    <View style={{backgroundColor:'white',paddingBottom:0,paddingTop:10,margin:6}}>
                    <View style={[Styles.container, { alignItems: 'flex-start', marginLeft: 5,marginBottom:5 }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Staff Pick </Text>
                    </View>
                    <ProductItem product={this.props.products[0]} goProduct={(id) => this._goProduct(id) }/>
                        <View style={{alignSelf:'center',margin:10}}>
                            <Text>Show More</Text>
                        </View>
                    </View>

                    {/* Trending */}
                    <View style={{backgroundColor:'white',paddingBottom:0,paddingTop:10,margin:6}}>
                    <View style={[Styles.container, { alignItems: 'flex-start', marginLeft: 5, marginBottom:5 }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Trending </Text>
                    </View>
                    <ProductItem product={this.props.products[1]} goProduct={(id) => this._goProduct(id) }/>
                        <View style={{alignSelf:'center',margin:10}}>
                            <Text>Show More</Text>
                        </View>
                    </View>

                    {/* Trending */}
                    <View style={{backgroundColor:'white',paddingBottom:0,paddingTop:10,margin:6}}>
                    <View style={[Styles.container, { alignItems: 'flex-start', marginLeft: 5, marginBottom:5 }]}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Popular Effects </Text>
                        <Text style={{ fontSize: 16}}> Choose products based off dominant effects  </Text>
                    </View>
                    
                        <View style={{alignSelf:'center',margin:10}}>
                            <Text>Show More</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

//
// Connect state.SearchReducer.activities and state.SearchReducer.effects to props.
//
function mapStateToProps(state) {
    return {
        staffPick: state.NewsReducer.staffPick,
        trending:  state.NewsReducer.trending,
    }
}

//
// Connect GoSearchAction, GetProductAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ GoSearchAction, GetProductAction }, dispatch); }

//
// BatsFix. Attach apollo query to the component. This creates props loading and products on HomeScene
//
const apolloProducts = gql`{
    allProducts(first:2,filter:{trend:None}){
      id,
      name,
      trend,
      activity,
      rating,
      ratingCount,
      thc,
      cbd,
    }
}`;
//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        products: data.allProducts,
    });
}

module.exports = graphql(apolloProducts,{props:mapDataToProps})(connect(mapStateToProps,mapActionToProps)(HomeScene));

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    FindProductButton: {
        flex: 1,
        height: 30,
        marginHorizontal: 10,
        marginTop: 0,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonSmall: {
        flex: 1,
        marginHorizontal: 3,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#999999',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    company: {
        flex: 1,
        textAlign: 'right',
        fontSize: 13,
        marginRight: 4,
        flexWrap: 'nowrap',
        height: 13
    },
    buttonText: {
        fontSize: 15,
        color: '#48BBEC',
        alignSelf: 'center',
    },
    button: {
        height: 33,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 22,
        margin: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',

    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    root: {
        backgroundColor: '#F5FCFF',
    },
    thumb: {
        width: 100,
        height: 100,
        marginRight: 7,
        borderRadius: 5,
        // borderTopLeftRadius: 60,
        // borderTopRightRadius: 0,
    },
    separator: {
        // height: 1,
        // backgroundColor: '#dddddd'
    },
    price: {
        marginTop: 3,
        marginRight: 4,
        flex: 1,
        textAlign: 'right',
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black'
    },
    title: {
        marginTop: 3,
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    rowContainer: {
        flexDirection: 'row',
        marginRight: 3,
    },
    outside: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 6,
        margin: 8,
    },
    rowContainerStars: {
        flexDirection: 'row',
        marginTop: 8,
        marginRight: 3,
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    tagActivity: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F5A623",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextActivity: {
        color: "#F5A623",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    tag: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagText: {
        color: "#4A90E2",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
});
