import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

//get internal components
import ProducerItem from '../../util/producerItem.js';
import {HerbyButton2,} from '../../../common/controls.js';
import HerbyModal from '../../util/herbyModal.js';

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {showInfo: false,infoMessage:""};
    }
    _showInfo(itemName) {
        var infoMessage = "no info";
        switch(itemName) {
            case 'rosin':  infoMessage = "Rosin is a solventless extraction method using heat an pressure. Rosin offers full spectrum of flavor and potiency from plant material."; break;
            case 'sativa': infoMessage = "sorry, the same here, no information whatsoever"; break;
        }
        console.log("showing info now");
        this.setState({showInfo:true,infoMessage:infoMessage});
    }
    _hideInfo() {
        this.setState({showInfo:false,infoMessage:""});
    }

    render() {
        return (
            <ScrollView>
                <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                {/* Overall rating */}
                <View style={{ justifyContent: "flex-end", marginTop: 10, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{this.props.product.name}</Text>
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
                        <Text style={{ fontSize: 20,marginTop:1 }}> ({this.props.product.ratingCount}) </Text>
                    </View>
                    <View style={{flex:1,flexDirection: "row",justifyContent:'flex-end' }}>
                      <TouchableOpacity style={Styles.tagCategory} onPress={()=>this._showInfo('rosin')}>
                          <Text style={Styles.tagTextCategory}>rosin</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={Styles.tagType} onPress={()=>this._showInfo('sativa')}>
                          <Text style={Styles.tagTextType}>sativa</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                {/* Description */}
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ flex: 1,justifyContent: 'center',marginTop:10,marginBottom:5 }}>
                        <Text style={{fontSize:16}}>
                            {this.props.product.description}
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
                                    rating={this.props.product.quality}
                                    selectedStar={(rating) => this._onQuality(rating)}
                                    />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    starColor={'#D0021B'}
                                    rating={this.props.product.flavor}
                                    selectedStar={(rating) => this._onFlavor(rating) }
                                    />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', height: 40 }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    starColor={'#D0021B'}
                                    rating={this.props.product.potency}
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
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.props.product.thca}%</Text>
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.props.product.thc}%</Text>
                          <Text style={{width:60,textAlign:'center',fontSize: 16}}>{this.props.product.cbd}%</Text>
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
                                <Text style={Styles.tagTextEffect}>{this.props.product.effect[0].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagEffect}>
                                <Text style={Styles.tagTextEffect}>{this.props.product.effect[1].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.tagEffect}>
                                <Text style={Styles.tagTextEffect}>{this.props.product.effect[2].name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: this.props.product.effect[0].strength }]}>
                                <Text style={Styles.tagTextEffect}> </Text>
                            </View>
                            <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: this.props.product.effect[1].strength }]}>
                                <Text style={Styles.tagTextEffect}> </Text>
                            </View>
                            <View style={[Styles.tagEffect, { backgroundColor: '#4A90E2', width: this.props.product.effect[2].strength }]}>
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
                            <Text style={Styles.tagTextActivity}>{this.props.product.activity[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagActivity}>
                            <Text style={Styles.tagTextActivity}>{this.props.product.activity[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagActivity}>
                            <Text style={Styles.tagTextActivity}>{this.props.product.activity[2]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Symptoms</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={Styles.tagSymptom}>
                            <Text style={Styles.tagTextSymptom}>{this.props.product.symptom[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagSymptom}>
                            <Text style={Styles.tagTextSymptom}>{this.props.product.symptom[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.tagSymptom}>
                            <Text style={Styles.tagTextSymptom}>{this.props.product.symptom[2]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 15 }}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Producer</Text>
                    </View>
                    <View style={{}}>
                      <ProducerItem producer={this.props.product.producer} goProducer={(t) => this.props.goProducer(t)}/>
                    </View>
                </View>
                <View style={{ height: 120, justifyContent: 'center' }}/>

                <View style={{marginTop:20}}>
                <HerbyModal  show={this.state.showInfo}>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1.2,backgroundColor:'white',borderRadius:10,width:320}}>

                            <View style={{flex:.8,marginTop:20}}><TouchableOpacity style={[Styles.tagCategory,{width:100,alignSelf:'center'}]}>
                              <Text style={Styles.tagTextCategory}>rosin</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{flex:1,width:300,marginTop:10,alignSelf:'center'}}>
                              <Text style={{alignSelf:'center',fontSize:16,}}>{this.state.infoMessage}</Text>
                            </View>

                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10}}>
                              <TouchableOpacity style={{width:100,alignSelf:'center',borderRadius:4,width:100,height:42,backgroundColor:'white',borderColor:'black',borderWidth:1,justifyContent:'center'}} onPress={()=>this._hideInfo()}>
                                <Text style={{fontSize:16,justifyContent:'center',alignSelf:'center'}}>Done</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{marginLeft:30,width:100,alignSelf:'center',borderRadius:4,width:100,height:42,backgroundColor:'white',borderColor:'#4A90E2',borderWidth:1,justifyContent:'center',backgroundColor:'#4A90E2'}} onPress={()=>this._hideInfo()}>
                                <Text style={{fontSize:16,justifyContent:'center',alignSelf:'center',color:'white'}}>Search</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                 </HerbyModal>
                 </View>

            </ScrollView>
        );
    }
}

module.exports=ProductInfo;

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
})
