import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useState,useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { BusContext } from '../../App';
import bus_api from '../../apis/bus_api';

const BusItem = ({route_id,from,to,dept_time}) => {
   const {bookedDate} = useContext(BusContext);
    const navigation = useNavigation();
    const [n,setN] = useState(null);
    const [error,setError] = useState();
    const[remSeats,setRemSeats] = useState('');

    useEffect(()=>{
      getAvailableSeats();
      console.log(bookedDate,route_id,dept_time);
    },[n])

    const getAvailableSeats = async() =>{
        try{
          const response =  await bus_api.post('bus_app/seats/',{
          route_id:route_id,
          date:bookedDate,
          depart_time:dept_time
          }) 
          setRemSeats(response.data.res);
          console.log(response.data);
          
          setN('ok');
        }catch(err){
           setError('Something went wrong');
        }
    }

  return (
    <Pressable style={styles.item} >
         
         <View style={styles.bus_info}>

         <FontAwesome5 name="bus-alt" size={130} color="black" />
          <Text> # 1</Text>

         </View>

         <View>

            <View style={styles.other_info}>
            <Text>From: {from}</Text>
            <Text>To: {to}</Text>  
            <Text>Departure Time: {dept_time} </Text>
       
            </View>
         
            <Text>Amenities</Text>
            <View style={styles.amenities}>
            <FontAwesome5 style={styles.icon} name="wifi" size={24} color="black" />
            <FontAwesome5 style={styles.icon} name="tv" size={24} color="black" />
            <FontAwesome5  style={styles.icon} name="charging-station" size={24} color="black" />
            </View>

             {remSeats ?<Text>Available seat: {remSeats}</Text> :null}

             <Pressable style={styles.btn} onPress={() => navigation.navigate('Seats',{dept_time:dept_time,route_id:route_id})}>
                <Text style={styles.btnText}>
                    View seats
                </Text>
             </Pressable>
         </View>
    
    </Pressable>
  )
}

export default BusItem

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#e2e3e5',
        padding:10,
        margin:10,
        flexDirection:'row',
        // alignItems: 'center',
        justifyContent: 'center'
    },
    bus_info:{
    margin:20,
    justifyContent:'center',
    alignItems:'center'
    },
    other_info:{
    
    },
    amenities:{
        flexDirection:'row',
        marginVertical:10
    },
    btn:{
        backgroundColor: '#a020f0',
        padding:10,
        marginVertical:10,
        borderRadius:8
    },
    btnText:{
        color:'white',
        textAlign: 'center'
        
    },
    icon:{
        marginHorizontal:5
    }

})