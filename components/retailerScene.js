//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';

//get internal components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import StarRating from 'react-native-star-rating';
//get internal components
import {GetProductAction,ShowMapAction} from '../actions';
import ReviewList         from './reviewList.js';
import ProductList        from './productList.js';

import {ProductFrameId, MapFrameId, UserFrameId, RetailerFrameId, }   from '../common/const.js';
import {SwitchFrameAction}   from '../actions';


class RetailerScene extends Component {

    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = this.props.retailer;

        this.state = {frameId:this.props.frameId};
        this.ProductFrameId = Styles.category;
        this.MapFrameId = Styles.category;
        this.UserFrameId = Styles.category;
        this.RetailerFrameId = Styles.category;
        this[this.props.frameId] = Styles.category2;
    }

    _frameStyle(frameId) {
        return this[frameId];
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.frameId != nextProps.frameId) {
            this._setFrame(frameId);
        }
    }



    _setFrame(frameId) {
        //
        // Change previous frameId to normal style
        //
        this[this.state.frameId] = Styles.category;

        //
        // Set new frameId to highlight
        //
        this[frameId] = Styles.category2;

        this.setState({frameId: frameId});
        this.props.SwitchFrameAction(frameId);
    }

     _onChange(event) {
        this.props.setSearchTerm(event.nativeEvent.text);

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

    _showMap() {
        this.props.ShowMapAction();
    }

    //
    // BatsFix. Nothing should be hardcoded in this function. All retailer info should come
    // from state or props
    //
    render() {
        return (
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: "flex-end"}}>
                        <Image source={require('../media/ikes1.png') } style={{ height: 140, width: 380 }}/>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:0,height:38}}>

                      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }}>
                          <TouchableOpacity  style={{flexDirection: "row",alignItems:'center'}}>
                              <Text style={{ fontSize: 14, color: "#9B9B9B" }}> INFO</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }}>
                          <TouchableOpacity style={{alignItems:'center'}}>
                              <Text style={{ fontSize: 14, color: "#9B9B9B"}}>MENU</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center' }}>
                          <TouchableOpacity >
                              <Text style={{ fontSize: 14, color: "#9B9B9B" }}> SOCIAL </Text>
                          </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:-40,shadowColor:'black',shadowRadius:.1,shadowOpacity:.2,shadowOffset: {height: -1,width: 0}}}/>

                  <View style={{}}>
                                 <View style={{flexDirection: "row",marginTop:10,marginHorizontal:10}}>
                                    <View style={[{ flex: 5,}]}>
                                      <View style={{height: 34,borderWidth:3,borderColor:'#ECECEC',borderRadius:6,backgroundColor: '#ECECEC',}}>
                                        <TextInput style={{marginHorizontal:10,
                                          height:28,
                                          fontSize: 20,
                                          backgroundColor: '#ECECEC',}}
                                            autoCapitalize  = "none"
                                            autoCorrect     = {false}
                                            placeholder     = "Search"
                                            returnKeyType   = "next"

                                            clearButtonMode = 'always'
                                            />
                                            </View>
                                    </View>
                                    <View style={{flex:.1}}></View>
                                    <View style={[{ flex: .7,justifyContent:'center',height: 34,}]}>
                                        <TouchableOpacity style={{}} onPress={this.props.startSearch}>
                                            <Image style={{ height: 33, width: 33,alignSelf:'center', }} source={require("../media/plusButton11.png") }/>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginHorizontal:0,height:40}}>
                                  <ScrollView horizontal='true'>
                                  <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center',marginHorizontal:20 }}>
                                      <TouchableOpacity  style={{flexDirection: "row",alignItems:'center'}}>
                                          <Text style={{ fontSize: 14, color: "#9B9B9B" }}> ALL</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'center',marginHorizontal:20 }}>
                                      <TouchableOpacity style={{alignItems:'center'}}>
                                          <Text style={{ fontSize: 14, color: "#9B9B9B"}}>FLOWER</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{ flex: 1, alignItems: 'center',flexDirection: "row",justifyContent:'center',marginHorizontal:30 }}>
                                      <TouchableOpacity >
                                          <Text style={{ fontSize: 14, color: "#9B9B9B" }}> CONCENTRATE </Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{ flex: 1, alignItems: 'center',justifyContent:'center',marginHorizontal:20}}>
                                      <TouchableOpacity >
                                          <Text style={{ fontSize: 14, color: "#9B9B9B" }}> INFUSED </Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{ flex: 1, alignItems: 'center',justifyContent:'center',marginHorizontal:20 }}>
                                      <TouchableOpacity >
                                          <Text style={{ fontSize: 14, color: "#9B9B9B" }}> EDIBLE </Text>
                                      </TouchableOpacity>
                                  </View>

                                </ScrollView>

                                  </View>

<View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:-40,shadowColor:'black',shadowRadius:.1,shadowOpacity:.2,shadowOffset: {height: -1,width: 0}}}/>
</View>

                    {/*Rating and link to map*/}
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.state.name}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>

                          <View style={{flex:1.5,alignItems:'flex-start',flexDirection:'row',marginTop:1}}>
                              <StarRating
                                  disabled={true}
                                  maxStars={5}
                                  starSize={28}
                                  starColor={'red'}
                                  rating={this.state.rating}
                                  selectedStar={(rating) => this._onRating(rating) }
                                  />
                              <Text style={{ fontSize: 18,marginTop:2 }}> ({this.state.ratingCount}) </Text>
                            </View>

                            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center' }}>
                               <TouchableOpacity style={{ backgroundColor: "#4A90E2",
                                                          borderRadius: 8,
                                                          borderWidth: 4,
                                                          borderColor: '#4A90E2',
                                                          alignSelf:'flex-end'
                                                          }}
                                                          onPress={()=>this._showMap()}>
                                <Text style={{ fontSize: 18, color: "white"}}> Show Map </Text>
                            </TouchableOpacity>
                            </View>

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
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,ShowMapAction }, dispatch); }

//
// Connect SwitchFrameAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ SwitchFrameAction }, dispatch); }


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
