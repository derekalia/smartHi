//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,TouchableHighlight,Navigator} from 'react-native';

//get internal components

import HomeScene     from './homescene.js';
import SearchScene   from './searchscene.js';
import ProductScene  from './productscene.js';
import ProductsScene from './productsscene.js';

/*
class ProductsScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Products Scene Placeholder</Text>
                </View>
            );
    }
}
*/
class ProducerScene extends Component {

    render() {
            return (
              <ScrollView>
                <View style={{flex:1}}>

                  <View style={{height:248,justifyContent:"flex-end"}}>
                    <Image source={require('../media/ikes1.png')} style={{height:190,width:380}}/>
                  </View>

                  <View style={{justifyContent:"flex-end",marginTop:10,marginHorizontal:10}}>
                    <Text style={{fontSize:22,fontWeight:'bold'}}>Uncle Ikes - Seattle</Text>
                  <View style={{flexDirection:"row",alignItems: 'center',height:40}}>
                      <Image source={require('../media/fullStar1.png')} style={{height:25,width:25,marginRight:3}}/>
                      <Image source={require('../media/fullStar1.png')} style={{height:25,width:25,marginRight:3}}/>
                      <Image source={require('../media/fullStar1.png')} style={{height:25,width:25,marginRight:3}}/>
                      <Image source={require('../media/fullStar1.png')} style={{height:25,width:25,marginRight:3}}/>
                      <Image source={require('../media/fullStar1.png')} style={{height:25,width:25}}/>
                      <Text style={{fontSize:20}}> (13)</Text>
                      <TouchableOpacity style={{backgroundColor:"#4A90E2",borderRadius:8,borderWidth:1,justifyContent:'flex-end',borderColor:'#4A90E2',marginLeft:74}}>
                        <Text style={{fontSize:18,color:"white",margin:4}}> Show Map </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{marginHorizontal:10}}>
                  <View style={{flex:1,height:85,justifyContent: 'center'}}>
                    <Text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla pharetra ex sed sagittis. Curabitur ligula ex, viverra eu magna vel, pretium tincidunt turpis.                    </Text>
                  </View>
                  </View>

                  <View style={{marginHorizontal:10}}>
                  <View style={{height:40,justifyContent: 'center'}}>
                  <Text style={{fontSize:20,fontWeight:'bold',}}>Menu</Text>
                  </View>


                  <View style={{flex:1}}>
                    <TouchableHighlight underlayColor='#dddddd'>
                      <View style={{ backgroundColor: 'white' }}>
                        <View style={Styles.outside}>
                          <Image style={Styles.thumb} source={require('../media/Rosin2.png')}/>
                          <View style={Styles.flexContainer}>
                            <View style={Styles.rowContainer}>
                              <Text style={Styles.title} numberOfLines={1}>XJ-13 Rosin</Text>
                              <Text style={Styles.price}>$34.99</Text>
                            </View>
                            <View style={Styles.rowContainerStars}>
                              {/*<StarRating
                                disabled={false}
                                maxStars={5}
                                starColor={'red'}
                                starSize={17}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating) }
                                />*/}
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


                  <View style={{flex:1}}>
                    <TouchableHighlight underlayColor='#dddddd'>
                      <View style={{ backgroundColor: 'white' }}>
                        <View style={Styles.outside}>
                          <Image style={Styles.thumb} source={require('../media/Rosin2.png')}/>
                          <View style={Styles.flexContainer}>
                            <View style={Styles.rowContainer}>
                              <Text style={Styles.title} numberOfLines={1}>XJ-13 Rosin</Text>
                              <Text style={Styles.price}>$34.99</Text>
                            </View>
                            <View style={Styles.rowContainerStars}>
                              {/*<StarRating
                                disabled={false}
                                maxStars={5}
                                starColor={'red'}
                                starSize={17}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating) }
                                />*/}
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
                  </View>
                  </View>







                  <View style={{marginHorizontal:10,marginTop:20}}>
                  <View style={{height:40,justifyContent: 'center'}}>
                  <Text style={{fontSize:20,fontWeight:'bold',}}>Reviews</Text>
                  </View>


                  <View style={Styles.column}>
                                      <View style={Styles.row}>
                                          {/*<TextInput
                                              style={{ height: 30, width: 345, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 4, fontSize: 15 }}
                                              onChangeText={(text) => this.setState({ text }) }
                                              value={this.state.text}
                                              placeholder={' Say something'}
                                              />*/}
                                      </View>
                                      <View style={Styles.row} style={{ margin: 2, marginTop: 15, flex: 1 }}>
                                          <View style={Styles.row}>
                                              <View style={{ height: 30, width: 30, borderWidth: 15, borderColor: 'lightblue', marginRight: 10 }}></View>
                                              <View style={Styles.column}>
                                                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: -2 }}>
                                                      Sue
                                                  </Text>
                                                  <Text style={{ fontSize: 13 }}>
                                                      2 hours ago
                                                  </Text>
                                              </View>
                                          </View>
                                          <Text style={{ fontSize: 14, marginTop: 8 }}>
                                              This is a comment. Dont give Farzad cookies. Cookie monster is dangerous!
                                          </Text>
                                          <View style={Styles.row}>
                                              <Text style={{ fontSize: 13, marginTop: 8 }}>2 </Text>
                                            <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 15 }}source={require('../media/up1.png') }/>
                                          <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 20, marginRight: 15 }}source={require('../media/down1.png') }/>
                                              <Text style={{ fontSize: 13, marginTop: 8, fontWeight: 'bold' }}> Reply </Text>
                                          </View>
                                      </View>
                                      <View style={Styles.row} style={{ margin: 2, marginTop: 15, flex: 1 }}>
                                          <View style={Styles.row}>
                                              <View style={{ height: 30, width: 30, borderWidth: 15, borderColor: 'lightgreen', marginRight: 10 }}></View>
                                              <View style={Styles.column}>
                                                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: -2 }}>
                                                      Cookie McCookieFace
                                                  </Text>
                                                  <Text style={{ fontSize: 13 }}>
                                                      1 hour ago
                                                  </Text>
                                              </View>
                                          </View>
                                          <Text style={{ fontSize: 14, marginTop: 8 }}>
                                              Give me more cookies!
                                          </Text>
                                          <View style={Styles.row}>
                                              <Text style={{ fontSize: 13, marginTop: 8 }}>1 </Text>
                                              <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 15 }}source={require('../media/up1.png') }/>
                                            <Image style={{ width: 20, height: 10, alignSelf: 'center', marginTop: 8, marginLeft: 20, marginRight: 15 }}source={require('../media/down1.png') }/>
                                              <Text style={{ fontSize: 13, marginTop: 8, fontWeight: 'bold' }}> Reply </Text>
                                          </View>
                                      </View>
                                  </View>
                              </View>
                  <View style={{marginHorizontal:10,marginTop:20}}>
                  <View style={{height:40,justifyContent: 'center'}}>
                  <Text style={{fontSize:20,fontWeight:'bold',}}> </Text>
                  </View>
                  </View>

            </ScrollView>
            );
    }
}
class ProducersScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Producers Scene Placeholder</Text>
                </View>
            );
    }
}
const HomeSceneIndex       = 0;
const SearchSceneIndex     = 1;
const ProductSceneIndex    = 2;
const ProducerSceneIndex   = 3;
const ProductsSceneIndex   = 4;
const ProducersSceneIndex  = 5;

var HomeTabScenes = [
    {title: "Herby",          component: HomeScene,     index: HomeSceneIndex},
    {title: "Search",         component: SearchScene,   index: SearchSceneIndex},
    {title: "Producer",       component: ProductScene,  index: ProductSceneIndex},
    {title: "Product",        component: ProducerScene, index: ProducerSceneIndex},
    {title: "Products",       component: ProductsScene, index: ProductsSceneIndex},
    {title: "Producers",      component: ProducersScene,index: ProducersSceneIndex},
];

var HomeTabRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        // BatsFix. Do something other than "Back" text

        if (index > 0) {
            return (
            <View style={{flex:1,marginTop:0,flexDirection:"row",justifyContent: 'center',alignItems: 'center',marginLeft:13}}>
                <Image source={require("../media/BackArrow.png")} style={{width:12,height:19}} />
                <Text onPress={navigator.jumpBack} style={{fontSize:18,color:"#007AFF"}}> Back</Text>
            </View>
            );
        }
    },
    RightButton: function(route, navigator, index, navState) {
        // BatsFix. Do make sure to go to the next page if there is one
        var routelist = navigator.getCurrentRoutes();
        console.log("on route size "+routelist.length);
        console.log("on index "+index);
        if (routelist.length > index+1) {
            return (
                <Text onPress={navigator.jumpForward} style={{fontSize:18,marginTop:11,color:"#007AFF", marginRight:13}}>Forward</Text>
             );
        }
        else {
            return null;
        }

    },
    Title: function(route, navigator, index, navState) {
        return (
            <Text style={{fontSize:18,marginTop:11,fontWeight:'bold'}}>
                  {route.title}
            </Text>
        );
    }
}

class HomeTab extends Component {

    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator}
                   searchScene={HomeTabScenes[SearchSceneIndex]}
                   producerScene={HomeTabScenes[ProducerSceneIndex]}
                   productScene={HomeTabScenes[ProductSceneIndex]}
                   productsScene={HomeTabScenes[ProductsSceneIndex]}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {HomeTabScenes[HomeSceneIndex]}
                navigationBar={

                    <Navigator.NavigationBar style={{flex:1,alignSelf:"center",justifyContent:"center",backgroundColor:"rgba(248,248,248,1)",borderWidth:1,borderColor:"#B2B2B2"}}
                        routeMapper = {HomeTabRouteMapper}
                    >

                    </Navigator.NavigationBar>

                }
            />
        );
    }
}

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
      margin:4,
      borderRadius: 20,
      borderWidth:1,
      borderColor:"#BD10E0",
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagTextType:{
      color:"#BD10E0",
      marginTop:7,
      marginBottom:7,
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


module.exports = HomeTab;
