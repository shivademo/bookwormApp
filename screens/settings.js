import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/Myheader';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      docId: '',
    };
  }

  getUserdetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email_id', '==', email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,
    });
    alert("Profile Saved Sucessfully")
  };

  componentDidMount() {
    this.getUserdetails();
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/page1.png')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
        }}>
        <MyHeader title="Settings" navigation={this.props.navigation} />
        <View style={{ width: '90%', alignItems: 'center' }}>
          <TextInput
            style={styles.formTextInput}
            placeholder="First Name"
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Last Name"
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
            value={this.state.lastName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Address"
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
            value={this.state.address}
            multiline={true}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Contact"
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
            keyboardType="numeric"
            value={this.state.contact}
            maxLength={10}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF9ED',
  },

  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: { fontSize: 25, fontWeight: 'bold', color: '#fff' },
});
