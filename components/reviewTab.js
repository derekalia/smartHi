//
// Description: reviewtab.js
// This contains the declaration for the review tab  of the app.
// It should only contain rate scenes navigation.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text,Image,TouchableHighlight, } from 'react-native';
import {Connect} from 'react-redux';


class ReviewTab extends Component {
    render() {
        return (
          <View style={{flex:1}}>
            <View style={{height:70,alignItems:'center',justifyContent: "center",backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}}>
              <View style={{marginTop:18}}>
                <Text style={{fontSize: 18, marginTop: 1, fontWeight: 'bold'}}>Review</Text>
              </View>
            </View>
            <View style={{alignItems:'center', marginTop:30}}>
            <View style={{marginHorizontal:49}}>
              <Text style={{fontSize:16,textAlign:'center'}}>Take a picture of the product’s front and back</Text>
              </View>
              <View style={{marginTop:20,borderWidth:3,borderColor:'black',padding:20,borderRadius:10}}>
                 <Image source={require("../media/imageIcon1.png") } style={{ width: 140, height: 100 }} />
                 <Text style={{fontSize:16,textAlign:'center',marginTop:10}}>Upload Front</Text>
              </View>
              <View style={{marginTop:20,borderWidth:3,borderColor:'black',padding:20,borderRadius:10}}>
                 <Image source={require("../media/imageIcon1.png") } style={{ width: 140, height: 100 }} />
                 <Text style={{fontSize:16,textAlign:'center',marginTop:10}}>Upload Back</Text>
              </View>
              <View style={{marginTop:20}}>
                <TouchableHighlight underlayColor='#dddddd'>
                    <View style={{ backgroundColor: '#007AFF',width:200,height:55,alignItems:'center',justifyContent: "center",borderRadius:15 }}>
                 <Text style={{color:"white",fontSize:16,textAlign:'center'}}>Submit</Text>
                 </View>
                 </TouchableHighlight>
              </View>
            </View>
          </View>
        );
    }
}

module.exports = ReviewTab;
