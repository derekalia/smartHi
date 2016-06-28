//components/mainpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,Navigator,TabBarIOS,} from 'react-native'

//get internal components
import Styles        from './styles.js';
import HomeTab       from './hometab.js';

const HomeTabId   = 'HomeTabId';
const SearchTabId = 'SearchTabId';
const ReviewTabId = 'ReviewTabId';
const MapTabId    = 'MapTabId';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: HomeTabId 
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="blue"
                tintColor="white"
                barTintColor="darkslateblue">
                <TabBarIOS.Item
                    title="Home Tab"
                    selected={this.state.selectedTab == HomeTabId}
                    onPress={()=>{this.setState({selectedTab: HomeTabId})}}>
                    <HomeTab/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search Tab"
                    selected={this.state.selectedTab == SearchTabId}
                    onPress={()=>{this.setState({selectedTab: SearchTabId})}}>
                    <View style={[Styles.container,{backgroundColor:'gray'}]}>
                        <Text> This is the search tab </Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Review Tab"
                    selected={this.state.selectedTab == ReviewTabId}
                    onPress={()=>{this.setState({selectedTab: ReviewTabId})}}>
                    <View style={[Styles.container,{backgroundColor:'gray'}]}>
                        <Text> This is the review tab </Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Map Tab"
                    selected={this.state.selectedTab == MapTabId}
                    onPress={()=>{this.setState({selectedTab: MapTabId})}}>
                    <View style={[Styles.container,{backgroundColor:'gray'}]}>
                        <Text> This is the map tab </Text>
                    </View>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

module.exports = MainPage;
