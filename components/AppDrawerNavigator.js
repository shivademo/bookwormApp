import {createDrawerNavigator} from 'react-navigation-drawer';
import  AppTabNavigator  from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import Settings from '../screens/settings';
import Notifications from '../screens/notification';



export const AppDrawerNavigator= createDrawerNavigator(
    {
        Home : {screen : AppTabNavigator},
        "Profile Settings":{screen: Settings},
        Notifications:{screen:Notifications}

    },
    {
        contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName : 'Home' 
    })

