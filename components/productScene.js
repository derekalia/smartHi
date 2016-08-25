//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

//get internal components
// import Styles from './styles.js';
import {GetProductAction,GetRetailerAction,GetProducerAction,} from '../actions';
import {HerbyFrameBar} from '../common/controls.js';

import ReviewList     from './reviewList.js';
import RetailerList   from './retailerList.js';
import ProductList    from './productList.js';

const ProductFrameId      = 0;
const ReviewFrameId    = 1;
const RetailerFrameId  = 2;
const RelatedFrameId   = 3;


class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.product;
    }
    render() {
        return (
            <ScrollView>
                {/* Overall rating */}
                <View style={{ justifyContent: "flex-end", marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.state.name}</Text>
                </View>
                <View style={{ marginTop: 5, marginHorizontal: 10,flexDirection: "row" }}>
                    <View style={{flex:1.2,alignItems: 'flex-start', flexDirection: "row",marginTop:8}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={28}
                            starColor={'#D0021B'}
                            rating={this.props.product.rating}
                            selectedStar={(rating) => this._onRating(rating) }
                            />
                        <Text style={{ fontSize: 20,marginTop:1 }}> ({this.state.ratingCount}) </Text>
                    </View>
                    <View style={{flex:1,flexDirection: "row",justifyContent:'flex-end' }}>
                      <TouchableOpacity style={Styles.tagCategory}>
                          <Text style={Styles.tagTextCategory}>rosin</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={Styles.tagType}>
                          <Text style={Styles.tagTextType}>sativa</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                {/* Description */}
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ flex: 1,justifyContent: 'center',marginTop:10,marginBottom:5 }}>
                        <Text style={{fontSize:16}}>
                            {this.state.description}
                       </Text>
                    </View>
                </View>
                {/*Rating breakdown*/}
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
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    starColor={'#D0021B'}
                                    rating={this.state.quality}
                                    selectedStar={(rating) => this._onQuality(rating)}
                                    />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    starColor={'#D0021B'}
                                    rating={this.state.flavor}
                                    selectedStar={(rating) => this._onFlavor(rating) }
                                    />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    starColor={'#D0021B'}
                                    rating={this.state.potency}
                                    selectedStar={(rating) => this._onPotency(rating) }
                                    />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Test results */}
                <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Test Results</Text>
                        <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',height:20,marginTop:20,}}>
                          <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>THCA</Text>
                          <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>THC</Text>
                          <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>CBD</Text>
                          <Text style={{width:60,textAlign:'center',fontWeight:'bold',fontSize: 16}}>TOTAL</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',height:30}}>
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.thca}%</Text>
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.thc}%</Text>
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.state.cbd}%</Text>
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>56%</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Effects</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1.4 }}>
                            <TouchableOpacity style={Styles.tagEffect}>
                                <Text style={Styles.tagTextEffect}>{this.state.effect[0].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagEffect}>
                                <Text style={Styles.tagTextEffect}>{this.state.effect[1].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagEffect}>
                                <Text style={Styles.tagTextEffect}>{this.state.effect[2].name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: this.state.effect[0].strength }]}>
                                <Text style={Styles.tagTextEffect}> </Text>
                            </View>
                            <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: this.state.effect[1].strength }]}>
                                <Text style={Styles.tagTextEffect}> </Text>
                            </View>
                            <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: this.state.effect[2].strength }]}>
                                <Text style={Styles.tagTextEffect}> </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Related activities */}
                <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Activies</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={Styles.tagActivity}>
                            <Text style={Styles.tagTextActivity}>{this.state.activity[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagActivity}>
                            <Text style={Styles.tagTextActivity}>{this.state.activity[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagActivity}>
                            <Text style={Styles.tagTextActivity}>{this.state.activity[2]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Symptoms</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={Styles.tagSymptom}>
                            <Text style={Styles.tagTextSymptom}>{this.state.symptom[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagSymptom}>
                            <Text style={Styles.tagTextSymptom}>{this.state.symptom[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagSymptom}>
                            <Text style={Styles.tagTextSymptom}>{this.state.symptom[2]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

class ProductReview extends Component {
    render() {
        return (
            <ScrollView>
                <ReviewList/>
            </ScrollView>
        );
    }
}

class ProductRetailer extends Component {
    _goRetailer(id) {
        this.props.goRetailer(id);
    }
    render() {
        return (
            <View>
                <RetailerList retailers={this.props.product.retailers} goRetailer={(id) => this._goRetailer(id)}/>
            </View>
        );
    }
}

class ProductRelated extends Component {
    _goProduct(id) {
        this.props.goProduct(id);
    }
    render() {
        return (
            <ScrollView>
                <ProductList productList={this.props.product.related} goProduct={(id)=>this._goProduct(id)}/>
            </ScrollView>
        );
    }
}

const ProductFrames = [
    {title: "product info",     component: ProductInfo,       index: ProductFrameId},
    {title: "product review",   component: ProductReview,     index: ReviewFrameId},
    {title: "product retailer", component: ProductRetailer,   index: RetailerFrameId},
    {title: "product related",  component: ProductRelated,    index: RelatedFrameId},
];

class ProductScene extends Component {
    constructor(props) {
        super(props);
        this.state={imageHeight:190};
    }

    _setFrame(frameId) {
        this.refs.navigator.jumpTo(ProductFrames[frameId]);
        this.setState({frameId: frameId});
    }

    _goRetailer(retailerId: string) {
        this.props.GetRetailerAction(retailerId);
    }

    _goProducer(producerId: string) {
        this.props.GetProducerAction(producerId);
    }

    renderScene(route, navigator) {
        // BatsFix.
        // to pass a prop to the component, that prop
        // first needs to be passed to the navigator object.
        return (
                <route.component 
                    frameId = {navigator.props.frameId}
                    product={navigator.props.product} 
                    goProduct={navigator.props.goProduct} 
                    goRetailer={navigator.props.goRetailer}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }
    _handleScroll() {
        if (this.state.imageHeight > 100) {
            this.setState({imageHeight:30});
        }
        else {
            this.setState({imageHeight:190});
        }
    }

    // BatsFix. There should be no hardcode items in render!
    render() {
        return (
        <View style={{flex:1,backgroundColor:'white',}}>
            <Image source={require('../media/RosinXJ.png') } style={{ height: 190, width: 380 }}/>
            <HerbyFrameBar entries={['Info','Reviews','Location','Related']} setFrame={(t)=>this._setFrame(t)}/>
            <Navigator
                style={{backgroundColor:'transparent',justifyContent: 'flex-start'}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {ProductFrames[ProductFrameId]}
                initialRouteStack = {ProductFrames}
                product={this.props.product}
                goProduct={(t)=>this.props.GetProductAction(t)}
                goRetailer={(t)=>this.props.GetRetailerAction(t)}
                frameId = {this.state.frameId}
            />
        </View>
        );
    }
}


// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        product: state.ProductReducer.product,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetRetailerAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction,GetRetailerAction,GetProducerAction,}, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProductScene);


const Styles = StyleSheet.create({
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
        borderColor: "#D3000D",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptom: {
        color: "#D3000D",
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
    input: {
        height: 40,
        marginLeft:7,
        fontSize: 20,
        backgroundColor: 'white',
    },
    category: {
        color:"#9B9B9B",
        backgroundColor: 'white',
        borderBottomWidth: 0,
    },
    category2: {
        color:"#468EE5",
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor:"#468EE5",
    },
})
