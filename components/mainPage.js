//
// Description: mainpage.js
// This contains the declaration for the main work area of the app
// which consists of several tabs. All of the tabs are declared separately
// It should only contain logic to manipulate tabs, specifically, it
// will change the selected tab based on SwitchTabAction result.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, TabBarIOS, View,} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import const ids.
import {HomeTabId,SearchTabId,ReviewTabId,ProfileTabId} from '../common/const.js';
// Import icons
import {HomeIcon,SearchIcon,ProfileIcon,MapIcon,ReviewIcon}        from '../common/icons.js';

import {SwitchTabAction,} from '../actions';

// Import tab elements
import HomeTab       from './homeTab.js';
import SearchTab     from './searchTab.js';
import ReviewTab     from './reviewTab.js';
import ProfileTab    from './profileTab.js';

// Import message element
import HerbyNotification from './util/herbyNotification.js';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: HomeTabId,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedTab: nextProps.tabId});
    }

    _changeTab(tabId) {
        this.props.SwitchTabAction(tabId);
    }

    render() {
        return (
            <View style={{flex:1}}>
            <TabBarIOS
                unselectedTintColor="grey"
                tintColor="#4A90E2"
                barTintColor="#F9F9F9"
                >
                <TabBarIOS.Item
                    title="Home"
                    icon={HomeIcon}
                    selected={this.state.selectedTab == HomeTabId}
                    onPress={() => { this._changeTab(HomeTabId) } }>
                    <HomeTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    icon={SearchIcon}
                    selected={this.state.selectedTab == SearchTabId}
                    onPress={() => { this._changeTab(SearchTabId) } }>
                    <SearchTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Review"
                    icon={ReviewIcon}
                    selected={this.state.selectedTab == ReviewTabId}
                    onPress={() => { this._changeTab(ReviewTabId) } }>
                    <ReviewTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Profile"
                    icon={ProfileIcon}
                    selected={this.state.selectedTab == ProfileTabId}
                    onPress={() => { this._changeTab(ProfileTabId) } }>
                    <ProfileTab selectedTab = {this.state.selectedTab}/>
                </TabBarIOS.Item>
            </TabBarIOS>
            <HerbyNotification/>
            </View>
        );
    }
}
//
// Connect state.NavigationReducer.tabId to tabId prop. Used to selected tab.
// Connect state.NavigationReducer.switchTab to switchTab prop. Used to initiate tab switch if changed.
//
function mapStateToProps(state) { return { tabId: state.NavigationReducer.tabId } }

//
// BatsFix. Giving up on a hacky optimization to keep tab and scene switching locally. From now on
// all tab, scene and frame switch happen via navigation state.
//

function mapActionToProps(dispatch) { return bindActionCreators({ SwitchTabAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(MainPage);
