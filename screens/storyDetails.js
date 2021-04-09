import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header, Card, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-web-linear-gradient';

export default class Details extends React.Component {
  componentDidMount() {
    this.getAuthordetails();
  }

  getAuthordetails = () => {
    db.collection('users')
      .where('email_id', '==', this.state.author_email)
      .get()
      .then((doc) => {
        doc.forEach((abc) => {
          this.setState({
            authorName: abc.data().first_name + ' ' + abc.data().last_name,
          });
        });
      });
  };


  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      authorName: '',
      author_email: this.props.navigation.getParam('details')['author'],
      storyName: this.props.navigation.getParam('details')['story_name'],
      gnre: this.props.navigation.getParam('details')['story_genre'],
      story: this.props.navigation.getParam('details')['story'],
      comments:''
    };
  }

  addNotification=()=>{
    db.collection('notifications').add({
      sender_id:this.state.userId,
      receiver_id: this.state.author_email,
      message:this.state.comments,
      message_status: 'unread',
      date: firebase.firestore.FieldValue.serverTimestamp()
    })
    alert("Feedback Successfully Saved")
    this.setState({comments:''})
  }

  render() {
    return (
      <ImageBackground
      source={require('../assets/page3.jpg')}
      style={{
      width: '100%',
      height: '100%',
        flex: 1,
      }}>
      <ScrollView>
        <View>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#696969"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'Read Story',
              style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
            }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#513934','#976E47','#A39374',"#FEFBCE"	],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          />
        </View>

        <View>
          <Card title={'Story Details'} titleStyle={{ fontSize: 20 }} containerStyle={{backgroundColor: '#FEFBCE'}}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name : {this.state.storyName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Author: {this.state.authorName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Email Id of the Author: {this.state.author_email}
              </Text>
            </Card>

            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Gnre: {this.state.gnre}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={'Story'} titleStyle={{ fontSize: 20 }} containerStyle={{backgroundColor: '#FEFBCE'}}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>{this.state.story}</Text>
            </Card>
          </Card>
        </View>
        <View >
          {this.state.author_email !== this.state.userId ? (
            <View style={styles.buttonContainer}>
                     <TextInput 
                     style ={styles.formTextInput}
                    placeholder="Give your comments"
                    multiline={true}
                    onChangeText={(text)=>{
                        this.setState({comments: text})
                    }}
                    value={this.state.comments}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={()=>{
                      this.addNotification()
                  
                    }}>
                    <Text> Save </Text>
                    
                    </TouchableOpacity>
                    </View>

          ) : null}

        </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
        button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },

      formTextInput:{
        width:"85%",
        height:60,
        alignSelf:'center',
        borderColor:'grey',
        borderRadius:10,
        borderWidth: 2,
        marginTop:20,
        padding:10,
        backgroundColor:"pink"
      },

});
