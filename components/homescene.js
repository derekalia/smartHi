//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
// import Styles from './styles.js';
import StarRating from 'react-native-star-rating';

class HomeScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {
            act: this.props.act,
            eff: this.props.eff,
            sale: ['good', 'bad', 'ugly'],
            starCount: 3.5
        }
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _onToSearch() {
        //
        // BatsFix. should it call setSearchAction criteria first?
        // Does it make sense to make all scenes available on all tabs?
        //
        this.props.navigator.push(this.props.searchScene);
    }
    _plusActivity() {
        console.log("plus category called");
    }
    _plusEffect() {
        console.log("plus category called");
    }
    _plusSale() {
        console.log("plus sale called");
    }
    // BatsFix. These should be broken into components later.
    render() {
        return (
            <View style={[{ marginTop: 50, flex: 1 }]}>
                <ScrollView>

                    <TouchableOpacity style={[Styles.FindProductButton]}
                        onPress={this._onToSearch.bind(this) }>
                        <Text style={{ color: 'white', fontSize: 22, }}>Find Product</Text>
                    </TouchableOpacity>

                    <View style={[Styles.container, { alignItems: 'flex-start', marginLeft: 5, height: 20 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Activity </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", height: 140, }}>
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity>
                                <Image style={{ width: 165, height: 165, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} source={require("../media/musicTile1.png") }>
                                    <View style={{ borderWidth: 1.5, borderRadius: 20, borderColor: "white" }}>
                                        <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: "black", fontSize: 20, color: "white", margin: 8 }}> music </Text>
                                    </View>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity>
                                <Image style={{ width: 165, height: 165, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} source={require("../media/movieTile1.png") }>
                                    <View style={{ borderWidth: 1.5, borderRadius: 20, borderColor: "white" }}>
                                        <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: "black", fontSize: 20, color: "white", margin: 8 }}> movie </Text>
                                    </View>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", height: 140, marginTop: 15 }}>
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity>
                                <Image style={{ width: 165, height: 165, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} source={require("../media/exerciseTile1.png") }>
                                    <View style={{ borderWidth: 1.5, borderRadius: 20, borderColor: "white" }}>
                                        <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: "black", fontSize: 20, color: "white", margin: 8 }}> exercise </Text>
                                    </View>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity>
                                <Image style={{ width: 165, height: 165, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} source={require("../media/createTile11.png") }>
                                    <View style={{ borderWidth: 1.5, borderRadius: 20, borderColor: "white" }}>
                                        <Text style={{ textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: "black", fontSize: 20, color: "white", margin: 8 }}> create </Text>
                                    </View>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[Styles.container, { alignItems: 'flex-start', marginLeft: 5, height: 20, marginTop: 10 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Effects </Text>
                    </View>

                    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[3]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[4]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[5]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[6]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tag}>
                            <Text style={Styles.tagText}>{this.state.eff[7]}</Text>
                        </TouchableOpacity>
                    </View>

                    {/*<View style={[{height:120,margin:10}]}>
          <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
          <Text style={{fontSize:16, fontWeight: 'bold'}}> Featured </Text>
          </View>
          <View style={[Styles.container,{flex:1.5,backgroundColor:'grey'}]}>
          <Text>Forged Cannabis</Text>
          <Text>Issaquah</Text>
          <Text>Washington</Text>
          </View>
          </View>*/}

                    <View style={[Styles.container, { alignItems: 'flex-start', marginLeft: 5, height: 20, marginTop: 10 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Trending </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableHighlight underlayColor='#dddddd'>
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={Styles.outside}>
                                    <Image style={Styles.thumb} source={require('../media/Rosin2.png') }/>
                                    <View style={Styles.flexContainer}>
                                        <View style={Styles.rowContainer}>
                                            <Text style={Styles.title} numberOfLines={1}>XJ-13 Rosin</Text>
                                            <Text style={Styles.price}>$34.99</Text>
                                        </View>
                                        <View style={Styles.rowContainerStars}>
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                starColor={'red'}
                                                starSize={17}
                                                rating={this.state.starCount}
                                                selectedStar={(rating) => this.onStarRatingPress(rating) }
                                                />
                                            <Text>(39) </Text>
                                            <Text style={Styles.company}>FORGED Cannabis</Text>
                                        </View>
                                        <View style={Styles.tagContainer}>
                                            <TouchableHighlight style={Styles.button}>
                                                <Text style={Styles.buttonText}>flower</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={Styles.button}>
                                                <Text style={Styles.buttonText}>indica</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={Styles.button}>
                                                <Text style={Styles.buttonText}>sleepy</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                                <View style={Styles.separator}/>
                            </View>
                        </TouchableHighlight>
                    </View>


                    {/*<View style={[Styles.container,{height:80,margin:10}]}>
              <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                <Text> Activities </Text>
                <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
                  <TouchableOpacity style={Styles.buttonSmall}>
                    <Text>{this.state.act[0]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.buttonSmall}>
                    <Text>{this.state.act[1]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.buttonSmall}>
                    <Text>{this.state.act[2]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this._plusActivity()} style={Styles.buttonSmall}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>*/}

                    {/*<View style={[Styles.container,{height:120,margin:10}]}>
              <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                <Text> Effects </Text>
                <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
                  <TouchableOpacity style={Styles.buttonSmall}>
                    <Text>{this.state.eff[0]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.buttonSmall}>
                    <Text>{this.state.eff[1]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.buttonSmall}>
                    <Text>{this.state.eff[2]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> this._plusEffect()} style={Styles.buttonSmall}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>*/}

                    {/*<View style={[Styles.container,{height:120,margin:10}]}>
              <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                <Text> On Sale Products </Text>
              </View>
              <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
                <TouchableOpacity style={Styles.buttonSmall}>
                  <Text>{this.state.sale[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonSmall}>
                  <Text>{this.state.sale[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttonSmall}>
                  <Text>{this.state.sale[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this._plusSale()} style={Styles.buttonSmall}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>*/}

                </ScrollView>
            </View>
        );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        act: state.SearchReducer.act,
        eff: state.SearchReducer.eff,
    }
}

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

module.exports = connect(mapStateToProps)(HomeScene);
