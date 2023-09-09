import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput,Button } from 'react-native-paper'
import { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { BusContext } from '../../App'
import { useContext } from 'react'
import bus_api from '../../apis/bus_api'
import {Chip} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


const ProfileScreen = () => {
    const [username, setUsername] = useState("ok");
    const [national,setNational] = useState("");
    const {usr_id,theme} = useContext(BusContext);
    const [error,setError] = useState('');
    const [n,setN] = useState(null);
    const [data,setData] = useState();
    const [feedback,setFeedback] = useState();
    const navigation = useNavigation();


    const getUserData = async() =>{
       
        try{
        const response = await bus_api.post('bus_app/users/user_data/',{
            usr_id:usr_id
        });
        setData(response.data.res);
        console.log(response.data.res);
        setUsername(response.data.res[0].username);
        setNational(response.data.res[0].national_id);
        setN('Ok');
  
        }catch(err){
          setError('Something went wrong');  
        }
       

    }



    useEffect(()=>{

    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    getUserData();
    // setNational(data[0].national_id);
    // setUsername(data[0].username);
    return unsubscribe;
    },[n])

    const updateUserData = async() =>{
     try{
        const response = await bus_api.post('bus_app/users/update/',{
            usr_id:usr_id,
            username:username,
            national_id:national
        });
        setFeedback(response.data.message);
     }catch(err){
        console.log(err);
        setError('Something went wrong ');
     }
    }

    const verifyData = () =>{
     if(username == ''){
       alert('Names are required');
     }else if(national == ''){
        alert('ID are required');
     }else{
      updateUserData();
     // getUserData();
     }
    }

  return (
    <View style={styles.container}>

        {n ?
       
        <View>
        <Image source={require('../../assets/bus.png')} 
          style={{width:300,height:150}}
          />  
          {feedback ? <Chip theme={theme}  style={styles.feedback} icon="information" >{feedback}</Chip> : null}
         <TextInput 
        style={styles.inputTxt}
        label="Names"
        value={username}
        mode='outlined'
        onChangeText={text => setUsername(text)}
      />
       <TextInput 
        style={styles.inputTxt}
        label="ID"
        value={national}
        mode='outlined'
        onChangeText={text => setNational(text)}
      />
      <Button style={styles.btn} mode='contained' onPress={() => verifyData()}>Submit</Button>
      <Button style={styles.btn} mode='contained' onPress={() => navigation.navigate('Login')}>Login into another account</Button>
        </View>
         :
         <ActivityIndicator  size={100} color='#a020f0' />}
        

      
   
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
    justifyContent:'center',
    flex:1
    },
    inputTxt:{
        margin:10
    },
    btn:{
        margin:10
    }
})