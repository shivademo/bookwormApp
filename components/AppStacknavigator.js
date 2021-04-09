import React from 'react';
import { Text, View } from 'react-native';
import firebase from "firebase";
import db from "../config";
import {createStackNavigator} from 'react-navigation-stack';
import ReadStory from '../screens/readStory';
import Details from '../screens/storyDetails';

export const AppStackNavigator = createStackNavigator({
    Read:{
        screen:ReadStory,
        navigationOptions:{headerShown:false}
    },
    StoryDetails:{
     screen : Details,
     navigationOptions:{headerShown:false}
  
    }
},
{
    initialRouteName : 'Read'
})



