import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DeckHomeScreen from '../screens/DeckHome';
import DeckDetailScreen from '../screens/DeckDetail';
import CreateDeckScreen from '../screens/CreateDeck';
import AddCardScreen from '../screens/AddCard';
import AllCardsScreen from '../screens/AllCards';

const DeckHomeStack = createStackNavigator({
  DeckHome: { screen: DeckHomeScreen },
  DeckDetails: {
    screen: DeckDetailScreen,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  AddCard: AddCardScreen,
  AllCards: AllCardsScreen
});

DeckHomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'DeckHome',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-albums` : 'md-albums'}
      />
    )
  };
};

DeckHomeStack.path = '';

const CreateDeckStack = createStackNavigator({
  CreateDeck: CreateDeckScreen
});

CreateDeckStack.navigationOptions = {
  tabBarLabel: 'CreateDeck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  )
};

CreateDeckStack.path = '';

const tabNavigator = createBottomTabNavigator({
  DeckHomeStack,
  CreateDeckStack
});

tabNavigator.path = '';

export default tabNavigator;
