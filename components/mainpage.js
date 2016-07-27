//
// Description: mainpage.js
// This contains the declaration for the main work area of the app
// which consists of several tabs. All of the tabs are declared separately
// It should only contain logic to manipulate tabs, specifically, it 
// will change the selected tab based on SwitchTabAction result.
// 

// Import modules
import React, { Component } from 'react';
import {StyleSheet, TabBarIOS, } from 'react-native';
import {connect} from 'react-redux';

// Import const ids. 
import {HomeTabId,SearchTabId,ReviewTabId,MapTabId,ProfileTabId} from '../common/const.js';
// Import icons
import {HomeIcon,SearchIcon,ProfileIcon,MapIcon,ReviewIcon}        from '../common/icons.js';

// Import tab elements
import HomeTab       from './hometab.js';
import SearchTab     from './searchtab.js';
import MapTab        from './maptab.js';
import ReviewTab     from './reviewtab.js';
import ProfileTab    from './profiletab.js';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: HomeTabId,
        }
    }

    componentWillReceiveProps(nextProps) {
        var tabId = nextProps.tabId;
        this.setState({selectedTab: tabId});
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="grey"
                tintColor="#4A90E2"
                barTintColor="#F9F9F9"
                >
                <TabBarIOS.Item
                    title="Home" 
                    icon={HomeIcon}
                    selected={this.state.selectedTab == HomeTabId}
                    onPress={() => { this.setState({ selectedTab: HomeTabId }) } }>
                    <HomeTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Map"
                    icon={MapIcon}
                    selected={this.state.selectedTab == MapTabId}
                    onPress={() => { this.setState({ selectedTab: MapTabId }) } }>
                    <MapTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    icon={SearchIcon}
                    selected={this.state.selectedTab == SearchTabId}
                    onPress={() => { this.setState({ selectedTab: SearchTabId }) } }>
                    <SearchTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Review"
                    icon={ReviewIcon}
                    selected={this.state.selectedTab == ReviewTabId}
                    onPress={() => { this.setState({ selectedTab: ReviewTabId }) } }>
                    <ReviewTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Profile"
                    icon={ProfileIcon}
                    selected={this.state.selectedTab == ProfileTabId}
                    onPress={() => { this.setState({ selectedTab: ProfileTabId }) } }>
                    <ProfileTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
//
// Connect state.NavigationReducer.tabId to tabId prop. Used to selected tab. 
// Connect state.NavigationReducer.switchTab to switchTab prop. Used to initiate tab switch if changed.
//
function mapStateToProps(state) { return { tabId: state.NavigationReducer.tabId, switchTab: state.NavigationReducer.switchTab } }
module.exports = connect(mapStateToProps)(MainPage);

