import { StyleSheet, Text, View,Pressable,ActivityIndicator,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import bus_api from '../../apis/bus_api'
import { useContext } from 'react'
import { BusContext } from '../../App'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SuccessMsg from '../components/SuccessMsg'
import {Chip} from 'react-native-paper'

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const {usr_id,
    from,setFrom,to,setTo,
    bookedDate,setBookedDate,
    bookedSeat,setBookedSeat,
    departure,routeId,
  fare} = useContext(BusContext);

  const [error,setError] = useState();
  const [data,setData] = useState();
  const [n,setN] = useState(null);
  const [success,setSuccess] =  useState(false); 
  const [feedback,setFeedback] = useState('');
  const [confirm,setConfirm] = useState('');

  const getUserData = async() =>{
    try{
    const response = await bus_api.post('bus_app/users/user_data/',{
      usr_id:usr_id
    }); 
    setData(response.data.res);
    setN('ok');
    }catch(err){
      console.log(err);
    }
  }

  const resetAllVariables = () =>{
     setFrom('');
     setTo('');
     setBookedDate('');
     setBookedSeat('');
  }


  const confirmTicket = async () =>{
    try{
      const response = await bus_api.post('bus_app/book_bus_seats/',{
        usr_id:usr_id,
        seat_no:bookedSeat,
        date_booked:bookedDate,
        depart_time:departure,
        route_id:routeId,
        fare:fare
      });
     console.log(response.data);
      if(response.data.res == 1){
       setSuccess(true);  
       resetAllVariables();
      }else{
        setConfirm('');
        setFeedback(response.data.message);
      }
    
    }catch(err){
      console.log(err);
      setError('Something went wrong');
    }

  }
  const verifyData = () =>{
 
    if(bookedSeat == '' && bookedDate == '' && departure == '' && routeId == '' && usr_id == ''){
      alert('Please fill all required or missing entries(?)');
      setConfirm('');
    }else{
      setConfirm(true);
      confirmTicket();
    }
  }

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
     console.log('focus');
      getUserData();
    });
     
    getUserData();
     return unsubscribe;
  },[n]);

  return (
    <ScrollView style={styles.container}>

      {n ? 
       <>

  {success ? <SuccessMsg /> :

     <>
        {feedback ? <Chip   style={styles.feedback} icon="information" >{feedback}</Chip> : null}
      <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
        <Text style={styles.txt}>Personal details</Text> 
     {usr_id ? <Button mode='contained' onPress={() => navigation.navigate('Profile')}>Edit</Button> 
     :
      <Button mode='contained' onPress={() => navigation.navigate('Login')}>Login</Button>  }
    

     </View>

    <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
    <Text style={styles.txt}>{data[0].username ? data[0].username : <Text style={{color:'red'}}>Login (Required)</Text>}</Text> 
    </View>

    <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
    <Text style={styles.txt}>{data[0].national_id ? data[0].national_id: <Text style={{color:'red'}}>ID (required)</Text>}</Text> 
    </View>
    

    <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
        <Text style={styles.txt}>Ticket details</Text> 
     </View>

     <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
        <Text style={styles.txt}>Date & destination </Text> 
         <Button mode='contained' onPress={() => navigation.navigate('Date')}>Edit</Button>
     </View>

     <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
        <Text style={styles.txt}>Date {bookedDate ? <Text>{bookedDate}</Text> : <Text style={{color:'red'}}>(Required)</Text>}</Text> 
     </View>

     <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
        <Text style={styles.txt}>Boarding</Text> 
        <Text style={styles.txt}>Heading </Text> 
     </View>

     <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
        <Text style={styles.txt}> {from ? <Text>{from}</Text> : <Text style={{color:'red'}}>(Required)</Text>}</Text> 
        <Feather name="arrow-right" size={24} color="black" />
        <Text style={styles.txt}> {to ? <Text>{to}</Text> : <Text style={{color:'red'}}>(Required)</Text>}</Text> 
     </View>

     <View style={{flexDirection:'row',margin:5,justifyContent:'space-around',alignItems:'center'}}>
      
     <FontAwesome5 name="bus-alt" size={120} color="black" />
     <View>
      <Button mode='contained' onPress={() => navigation.navigate('Date')}>Edit</Button> 
      
      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <Feather name="clock" size={24} color="black" /> 
      <Feather name="arrow-right" size={24} color="black" />
      <Text style={{fontSize:20}}>{departure ? <Text>{departure}</Text>: <Text>?</Text>}</Text>
      </View>


     <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <MaterialCommunityIcons name="car-seat" size={35} color="black" />
      <Feather name="arrow-right" size={24} color="black" />
      <Text style={{fontSize:20}}> {bookedSeat ? <Text>{bookedSeat}</Text>: <Text>?</Text>}</Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',margin:5}}>
      <FontAwesome5 name="money-bill-wave" size={24} color="black" />
      <Feather name="arrow-right" size={24} color="black" />
      <Text style={{fontSize:20}}> {fare ? <Text>{fare}</Text>: <Text>?</Text>}</Text>
      </View>

      </View>


     </View>
   { confirm ? <ActivityIndicator  size={30} color='#a020f0' />  : <Button mode='contained' style={{marginVertical:20}}  onPress={() => verifyData()}>Confirm</Button>}   

    </> 
    }
        </>
      : 
       <ActivityIndicator  size={100} color='#a020f0' />}
     
     


    </ScrollView>
  )
}

export default ConfirmationScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
     margin:20,
     padding:10,
  },
  btn:{
    backgroundColor: '#a020f0',
    padding:5,
    borderRadius:8
},
btnText:{
    color:'white',
    textAlign: 'center',
    fontSize:18
},
txt:{
  fontSize:20
}, feedback:{
  margin:10,

}
})