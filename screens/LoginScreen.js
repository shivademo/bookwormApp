import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import db from '../config';

export default class Loginscreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: 'false',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
    };
  }

  userLogIn = (email, password) => {
    firebase
     .auth()
      .signInWithEmailAndPassword('teacher@gmail.com', '123456')
      .then(() => {
        return this.props.navigation.navigate('ReadStory');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  userSignUp = (email, password, confirm) => {
    if (password !== confirm) {
      return alert("password doesn't match Check your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
          });
          return alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="first name"
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="last name"
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="address"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="contact"
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="emailId"
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="confirm password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({
                      isModalVisible: false,
                    });
                  }}>
                  <Text style={{ color: '#ff5722' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/bacgr.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
        }}>
        <View style={styles.container}>
          {this.showModal()}

          <View style={styles.profileContainer}>
            <View>
              <Image
                source={require('../assets/images.png')}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                }}
              />
            </View>

            <Text style={styles.title}>The BookWorm</Text>
          </View>
          <View style={{ margin: 10 }}>
            <TextInput
              style={styles.loginBox}
              placeholder="Enter your email Id"
              placeholderTextColor="black"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              placeholder="enter your password"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
              this.userLogIn(this.state.emailId, this.state.password);

              }}>
              <LinearGradient
                colors={['red', 'brown', 'black']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>LogIn</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.textSign}>Don't Have An Account?</Text>

            <TouchableOpacity
              style={styles.signUPbutton}
              onPress={() => {
                this.setState({
                  isModalVisible: true,
                });
              }}>
              <Text style={styles.signText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    paddingBottom: 30,
    color: '#2C9A9F',
    //fontFamily: 'broadway',
  },
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 0.1,
    borderColor: 'black',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  button: {
    backgroundColor: 'transparent',
    width: '90%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0,
    justifyContent: 'center',

    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
  },

  signUPbutton: {
    width: '90%',
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },
  textSign: {
    marginTop: 10,
    textAlign: 'center',
  },
  signText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 20,
  },
  linearGradient: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center'
  },
});
