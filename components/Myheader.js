import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import Notification from '../screens/notification';
import db from '../config';
import LinearGradient from 'react-native-web-linear-gradient';
import firebase from 'firebase';

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userId: firebase.auth().currentUser.email,
    };
  }
  getNumberOfUnreadNotifications = () => {
    this.notificationRef = db
      .collection('notifications')
      .where('receiver_id', '==', this.state.userId)
      .where('message_status', '==', 'unread')
      .onSnapshot((snapshot) => {
        var unread_notifications = snapshot.docs.map((doc) => {
          doc.data();
        });
        this.setState({
          value: unread_notifications.length,
        });
      });
  };

  componentDidMount() {
    this.getNumberOfUnreadNotifications();
  }

  bellIconWithbadge = (props) => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="black"
          size={30}
          onPress={() => this.props.navigation.navigate('Notifications')}
        />
        <Badge
          value={this.state.value}
          containerStyle={{ position: 'absolute', top: -6, right: -2 }}
        />
      </View>
    );
  };
  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="black"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
        }}
        rightComponent={<this.bellIconWithbadge {...this.props} />}
        ViewComponent={LinearGradient} // Don't forget this!
  linearGradientProps={{
    colors: ['#513934','#976E47','#A39374',"#FEFBCE"	],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }}
      />
    );
  }
}
