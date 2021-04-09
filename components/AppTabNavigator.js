import React,{Component} from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {AppStackNavigator} from './AppStacknavigator'
import WriteStory from '../screens/writeStory';

const AppTabNavigator = createBottomTabNavigator({
    ReadStory:{screen: AppStackNavigator, navigationOptions:{
         tabBarIcon : <Image source={require("../assets/read.png")} style={{width:40, height:30}}/>, 
         tabBarLabel : "Read Story",}},
     WriteStory:{screen: WriteStory, navigationOptions:{
          tabBarIcon : <Image source={require("../assets/write.png")} style={{width:40, height:30}}/>,
       tabBarLabel : "Write Story",}} 

     
})

export default AppTabNavigator