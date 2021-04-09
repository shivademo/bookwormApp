import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import {Avatar} from 'react-native-elements';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
import LinearGradient from 'react-native-web-linear-gradient';
import * as Permissions from 'expo-permissions';

export default class CustomSideBarMenu extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      image: '#',
      name: '',
      docId: '',
    };
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.uploadimage(uri, this.state.userId);
    }
  };

  uploadimage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImg(imageName);
    });
  };

  componentDidMount() {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + ' ' + doc.data().last_name,
            docId: doc.id,
          });
        });
      });

    this.fetchImg(this.state.userId);
  }
  fetchImg = (imgname) => {
    var storage = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imgname);
    storage
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
          }}>
          <LinearGradient colors={['#F7D299', '#FE8E77', '#E6663C']}
                style={styles.linearGradient}>
          <Avatar
            rounded
            size="medium"
            showEditButton
            containerStyle={{
              flex: 0.75,
              width: '40%',
              height: '20%',
              marginLeft: 20,
              marginTop: 30,
              borderRadius: 40,
            }}
            source={{ uri: this.state.image }}
            onPress={() => {
              this.selectPicture();
            }}
          />
          <Text style={{ fontWeight: '100', fontSize: 20, paddingTop: 10 }}>
            {this.state.name}
          </Text>
          </LinearGradient>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate('login');
              firebase.auth().signOut();
            }}>
            <Text> Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.8,
  
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  logOutButton: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  logOutText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  linearGradient: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center'
  }
  
});
