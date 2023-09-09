import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { useContext } from 'react';
import { BusContext } from '../../App';
import { ToastAndroid } from 'react-native';

const HomeScreen = ({route}) => {
  
  const {storeUsrIdKey,setUsrId,usr_id} = useContext(BusContext)
  const navigation = useNavigation();

   useEffect(()=>{
    console.log(usr_id);
   },[])

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const logOut = ()=>{
    storeUsrIdKey('usr_id','');
     showToast('You have logout');
     setUsrId(null);
  }

  return (
    <View style={styles.container}>

      <Pressable onPress={() => navigation.navigate('Login')} style={styles.btn}>
        <Text style={styles.btnText}>
        <SimpleLineIcons style={{margin:5}} name="login" size={20} color="white" />  Account login </Text>
      </Pressable>


      <Pressable onPress={() => navigation.navigate('Register')} style={styles.btn}>
        <Text style={styles.btnText}>  <MaterialCommunityIcons name="clipboard-edit-outline" size={24} color="white" /> Register account</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Date')} style={styles.btn}>
        <Text style={styles.btnText}> <FontAwesome name="bus" size={20} color="white" /> Book bus</Text>
      </Pressable>
      {usr_id ? 
      <View>
    <Pressable onPress={() => navigation.navigate('Manage')} style={styles.btn}>
        <Text style={styles.btnText}> <FontAwesome name="ticket" size={20} color="white" /> Manage ticket</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')} style={styles.btn}>
        <Text style={styles.btnText}> <FontAwesome name="user" size={20} color="white" /> Manage profile </Text>
      </Pressable>
      </View> : 
      null}
  

      {usr_id ? <Pressable onPress={() => logOut()} style={styles.btn}>
        <Text style={styles.btnText}>
        <MaterialIcons tyle={{margin:5}}name="logout" size={20} color="white" /> Logout </Text>
      </Pressable> : null}
    

    
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
container:{
     flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',  
},
btn:{
  backgroundColor: '#a020f0',
  padding:10,
  margin:10,
  borderRadius:8
},
btnText:{
  color:'white',
  fontSize:20,
  textAlign: 'center'
},
 
})