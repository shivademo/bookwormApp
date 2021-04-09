import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import AppTabNavigator from './components/AppTabNavigator'
import Loginscreen from "./screens/LoginScreen";
import {AppDrawerNavigator} from "./components/AppDrawerNavigator"

export default class App extends React.Component {
  render(){
    return(
  <AppContainer
        
  />
    )
}
}
 
const AppNavigator=createSwitchNavigator({
  login:{ screen :Loginscreen },
  drawer:{screen:AppDrawerNavigator},
  tabs:{screen:AppTabNavigator}
})

const AppContainer = createAppContainer(AppNavigator)
