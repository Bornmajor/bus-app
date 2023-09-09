import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BusContext } from '../../App';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import bus_api from '../../apis/bus_api';

const SeatItem = ({seat_no,seat_class,seat_status}) => {

    
    const {setBookedSeat,
      setShowSeatHeader,listBookedSeats,
      bookedDate,departure,
      setSeatStat,routeId,setFare
    } = useContext(BusContext)

   const [seatColor,setSeatColor] = useState('');
   const [seatBackground,setSeatBackground] = useState('#e2e3e5');
   const navigation = useNavigation();
   const [list,setList] = useState();

   const checkSeatStatus = () =>{

    listBookedSeats.forEach(seat =>{
      for(let val in seat){
        //console.log(`${seat[val]}`);
        if(seat[val] == seat_no){
          setSeatBackground('#f797a0');
        }

      }
    })
     
   }

   const getFare = async () =>{
    try{
     const response = await bus_api.post('bus_app/fares/',{
       route_id: routeId,
       seat_class: seat_class,
     })
     if((response.data.res !== '')){
      setFare(response.data.res); 
      console.log(response.data.res);
   
     }
    
   
    }catch(err){
     console.log(err);
    }
    }

   const checkSeatAvailable = async() =>{
    setSeatStat('');
    setShowSeatHeader(true);
     try{
      const response = await bus_api.post('bus_app/check_booked_seats/',{
        seat_no:seat_no,
        date_booked:bookedDate,
        depart_time: departure,
      });
      
      console.log(response.data);
      if(response.data.res == 0){
      //seat available 
      
      setSeatStat('Load');
      setBookedSeat(seat_no);   
      getFare();
      setShowSeatHeader(true);

   
      }else{
      setBookedSeat(null);   
      setShowSeatHeader(false); 
      }

     }catch(err){
      console.log(err);
     }
   }


   
   useEffect(()=>{

    if(seat_class == 'first'){
    setSeatColor('blue');
   }else if(seat_class == 'business'){
      setSeatColor('green');
   }else if(seat_class == 'economy'){
     setSeatColor('orange');
   }

   setShowSeatHeader(false);
   checkSeatStatus();

  var list = listBookedSeats.map(function(obj){
    return obj.seat_no;
  })
  setList(list);

   },[listBookedSeats])

 

  return (
    <Pressable style={[styles.item,{borderTopColor: seatColor,borderTopWidth:4,backgroundColor: seatBackground}]}
    onPress={() => checkSeatAvailable() }
    >
      <Text style={{color:'black'}}>{seat_no}</Text>
    </Pressable>
  )

}

export default SeatItem

const styles = StyleSheet.create({
    item:{
         backgroundColor: '#bdbcc2',
        padding:20,
        alignItems: 'center',
        margin:10,
        // borderRadius:8,
        
      
   
    }
})