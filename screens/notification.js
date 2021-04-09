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
  FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements'
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/Myheader';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: [],
      text : "read"

    };

    this.notificationRef = null;
  }
  changeText = (text) => {

  this.setState({ text }); 
} 


    getNotifications=()=>{
    this.notificationRef = db.collection("notifications").where('receiver_id','==',this.state.userId).where("message_status",'==','unread').onSnapshot((snapshot)=>{
      var list = []
      snapshot.docs.map((doc) =>{ 
       var a= doc.data();
        a ['doc_id']=doc.id
        list.push(a)
      })
      this.setState({ 
        allNotifications : list
      });
    })
  }

  componentDidMount(){
    this.getNotifications();
   
  }



  renderItem=({item,i})=>{
  return (
    <ListItem
        key={i}
        title={item.message}
        subtitle={item.sender_id}
        subtitleStyle={{ color: 'black', fontWeight: 'bold' }}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        containerStyle={{backgroundColor:"transparent"}}
        rightElement={
            
                <TouchableOpacity style={styles.button}
  
              onPress ={()=>{
                this.updateStatus(item.doc_id)
              }}
              >
              <Text style={{color:'#ffff'}}>{item.message_status== 'unread'?"Mark as read":"Read"}</Text>
            </TouchableOpacity>

            
          } 
        bottomDivider
      />
  )
}
updateStatus=(doc_id)=>{
  db.collection('notifications').doc(doc_id).update({message_status:'read'})
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
        <View>
        <MyHeader title="Notifications" navigation ={this.props.navigation}/>
        <View>
          {
            this.state.allNotifications.length===0 
            ?(
              <View><Text>List of Notifications</Text></View>
            ):
            (
              
              <FlatList 
              data={this.state.allNotifications} 
              renderItem={this.renderItem} 
              keyExtractor={(item, index) => index.toString()
              } />
            )
          }
          
        </View>

        </View>
        </ImageBackground>
      );
    }
  }
  const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#902C15",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })

