//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';

//get internal components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import StarRating from 'react-native-star-rating';
//get internal components
import {GetProductAction} from '../actions';
import ReviewList         from './reviewList.js';
import ProductList        from './productList.js';

class RetailerScene extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = this.props.retailer;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.retailer);
    }


    _goProduct(productId) {
        //
        // Go to product page
        //
       this.props.GetProductAction(productId);
    }

    //
    // BatsFix. Nothing should be hardcoded in this function. All retailer info should come
    // from state or props
    //
    render() {
        return (
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 248, justifyContent: "flex-end" }}>
                        <Image source={require('../media/ikes1.png') } style={{ height: 190, width: 380 }}/>
                    </View>
                    {/*Rating and link to map*/}
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
                            <Text style={{ fontSize: 19 }}> ({this.state.ratingCount}) </Text>
                           <TouchableOpacity style={{ backgroundColor: "#4A90E2",
                                                      borderRadius: 8,
                                                      borderWidth: 1,
                                                      justifyContent: 'flex-end',
                                                      borderColor: '#4A90E2',
                                                      marginLeft: 74 }}>
                                <Text style={{ fontSize: 18, color: "white", margin: 4 }}> Show Map </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*Description*/}
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flex: 1, height: 85, justifyContent: 'center' }}>
                            <Text>{this.state.description}</Text>
                        </View>
                    </View>
                    {/*Products*/}
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Menu</Text>
                        </View>
                        <ProductList productList={this.state.products} goProduct={(id)=>this._goProduct(id)}/>
                    </View>
                </View>
                <ReviewList/>
            </ScrollView>
        );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        retailer: state.RetailerReducer.retailer,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProductAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(RetailerScene);

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonLarge: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#8888ff',
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
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    bg: {
        position: 'absolute',
        width: 352,
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
    },
});
