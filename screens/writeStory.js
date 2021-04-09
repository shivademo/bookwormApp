import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import LinearGradient from 'react-native-web-linear-gradient';
import MyHeader from '../components/Myheader';

export default class WriteStory extends React.Component {
  constructor() {
    super();
    this.state = {
      storyName: '',
      story: '',
      userId: firebase.auth().currentUser.email,
      gnre: '',
    };
  }

  addStory = (name, genre, story) => {
    db.collection('stories').add({
      author: this.state.userId,
      story_id: Math.random().toString(36).substring(7),
      story_name: name,
      story_genre: genre,
      story: story,
    });
    alert('Successfully saved the story');
    this.setState({ storyName: '', story: '', gnre: '' });
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/page1.png')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
        }}>
        <View>
          <MyHeader title="Write Story" navigation={this.props.navigation} />
          <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <TextInput
              style={styles.formTextInput}
              placeholder="Enter the story name"
              onChangeText={(text) => {
                this.setState({ storyName: text });
              }}
              value={this.state.storyName}
            />

            <TextInput
              style={styles.formTextInput}
              placeholder="Gnre of the Story"
              onChangeText={(text) => {
                this.setState({ gnre: text });
              }}
              value={this.state.gnre}
            />

            <TextInput
              style={[styles.formTextInput, { height: 300 }]}
              placeholder="Write your complete story"
              multiline={true}
              onChangeText={(text) => {
                this.setState({ story: text });
              }}
              value={this.state.story}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addStory(
                  this.state.storyName,
                  this.state.gnre,
                  this.state.story
                );
              }}>
              <LinearGradient
                colors={["#FF6200","#FF6200","#FDB777"]}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>Save Your Story</Text>
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: 'black',
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
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  linearGradient: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
  },

});
