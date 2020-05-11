import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIconAwesome5 from '../components/TabBarIconAwesome5';
import TabBarIconIonicons from '../components/TabBarIconIonicons';

import PublicListScreen from '../screens/PublicListScreen';
import UserPostsScreen from '../screens/UserPostsScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen'

import PostScreen from '../screens/PostScreen'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Rents';

export default function BottomTabNavigator({ navigation, route }) {

  

  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Rents"
        component={ PublicListScreen }
        options={{
          title: 'skelbimai',
          tabBarIcon: ({ focused }) => <TabBarIconAwesome5 focused={focused} name="user-friends" />,
        }}
      />
      <BottomTab.Screen
        name="Posts"
        component={ UserPostsScreen }
        options={{
          title: 'jūsų skelbimai',
          tabBarIcon: ({ focused }) => <TabBarIconAwesome5 focused={focused} name="user-alt" />,
        }}
      />
      <BottomTab.Screen
        name="Chats"
        component={ ChatScreen }
        options={{
          title: 'pokalbiai',
          tabBarIcon: ({ focused }) => <TabBarIconIonicons focused={focused} name="ios-chatboxes" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={ SettingsScreen }
        options={{
          title: 'nustatymai',
          tabBarIcon: ({ focused }) => <TabBarIconAwesome5 focused={focused} name="user-cog" />,
        }}
      />
    </BottomTab.Navigator>
  )
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  
    switch (routeName) {
      case 'Rents':
        return 'Public list'
      case 'Posts':
        return 'User Posts'
      case 'Chats':
        return 'Chats'
      case 'Settings':
        return 'Settings';
    }
  }