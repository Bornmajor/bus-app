import { StyleSheet, Text, View,ScrollView ,Pressable, ActivityIndicator} from 'react-native'
import React,{useEffect, useState} from 'react'
import SeatItem from '../components/SeatItem'
import KeyDetails from '../components/KeyDetails';
import { FontAwesome5 } from '@expo/vector-icons';
import { useContext } from 'react';
import { BusContext } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import bus_api from '../../apis/bus_api';
 import {Button } from 'react-native-paper';

const SeatsScreen = ({route}) => {
     const {route_id,dept_time} = route.params;
    const navigation = useNavigation();
    const {bookedSeat,showSeatHeader,
      setShowSeatHeader,bookedDate,
      setListBookedSeats,listBookedSeats,setDeparture,
      setRouteId,seatStat,
    fare} = useContext(BusContext);
    const[error,setError] = useState();
    const[n,setN] = useState(null);


    const getListBookedSeats = async() =>{
         try{
          const response = await bus_api.post('bus_app/get_booked_seats/',{
            depart_time:dept_time,
            date: bookedDate,
            route_id:route_id,
          });
          setListBookedSeats(response.data.res);
          //console.log(response.data.res);
          setN('ok');
          setDeparture(dept_time);
          setRouteId(route_id);

         // console.log('updated');
         }catch(err){
           console.log(err);
           setError('Something went wrong');
         }
         console.log(listBookedSeats)

    } 

  

    useEffect(()=>{
      const unsubscribe = navigation.addListener('blur', () => {
        // console.log('focused');
        setListBookedSeats([]);
        });

       getListBookedSeats();  
       console.log(listBookedSeats);
     return unsubscribe;
    },[navigation]);
   
  return (
    <View style={{flex:1}}>
       {n ? 
       <View>
        {/* <Button onPress={() => setShowSeatHeader(true)}>Press</Button> */}
      <ScrollView>

<KeyDetails />
 <Text style={{marginHorizontal:10,fontSize:20}}>Pick a seat of your choice</Text>

  <View style={{flexDirection:'row',width:'100%'}}>

   <View style={styles.leftSeats}>
 
   <View  style={styles.seatGroups}>
   <SeatItem seat_no={2} seat_class='first' seat_status='available'  />
   <SeatItem seat_no={3} seat_class='first' seat_status='booked'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={5} seat_class='first'/>
   <SeatItem seat_no={6} seat_class='first'/>   
    </View>

   

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={8} seat_class='first'/>
   <SeatItem seat_no={9} seat_class='first'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={11} seat_class='first'/>
   <SeatItem seat_no={12} seat_class='first'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={14} seat_class='business'/>
   <SeatItem seat_no={15} seat_class='business'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={17} seat_class='business'/>
   <SeatItem seat_no={18} seat_class='business'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={20} seat_class='business'/>
   <SeatItem seat_no={21} seat_class='business'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={23} seat_class='business'/>
   <SeatItem seat_no={24} seat_class='business'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={26} seat_class='economy'/>
   <SeatItem seat_no={27} seat_class='economy' />   
    </View>

 

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={29} seat_class='economy'/>
   <SeatItem seat_no={30} seat_class='economy'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={32} seat_class='economy'/>
   <SeatItem seat_no={33} seat_class='economy'/>   
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={35} seat_class='economy'/>
   <SeatItem seat_no={36} seat_class='economy'/>   
    </View>

   </View>

   <View style={styles.middleSeats}>

   <View  style={styles.seatGroups}>
   <SeatItem seat_no={38} seat_class='economy'/>
    </View>

   </View>



   <View style={styles.rightSeats}>

   <View  style={styles.seatGroups}>
   <SeatItem seat_no={4} seat_class='first'/>
     
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={7}  seat_class='first'/>
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={10}  seat_class='first'/> 
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={13}  seat_class='first'/>
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={16}  seat_class='business'/>
    </View>

    <View  style={styles.seatGroups}>
    <SeatItem seat_no={19}  seat_class='business'/>
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={22} seat_class='business'/>
  
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={25} seat_class='business'/>

    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={28} seat_class='economy'/>
     
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={31} seat_class='economy'/>
   
    </View>

    <View  style={styles.seatGroups} >
   <SeatItem seat_no={34} seat_class='economy'/>
    
    </View>

    <View  style={styles.seatGroups}>
   <SeatItem seat_no={37} seat_class='economy'/>
    </View>

 

   </View>



   </View>
  
</ScrollView>
{ showSeatHeader && (
     <View style={styles.stickyHeader}>

      
        {seatStat ?
         <View>
     <View style={{marginHorizontal:10}}>
        <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize:25}}>Seat selected <FontAwesome5 name="arrow-right" size={20} color="black" /> 
        </Text>
          {bookedSeat ?<Text style={{fontSize:25}}>{bookedSeat}</Text> :null}
          </View>
     

          <Text style={{fontSize:25}} >Seat price <FontAwesome5 name="arrow-right" size={20} color="black" />  {fare}</Text>

          <Pressable style={{position: 'absolute',right:0}} onPress={() => setShowSeatHeader(false)}>
               <AntDesign name="closecircle" size={30} color="black" /> 
          </Pressable>
      
        </View>
        

        <Pressable style={styles.btn} onPress={() => navigation.navigate('Confirm')}>
           <Text style={styles.btnText}>Proceed</Text>
        </Pressable>
        </View>
        : 
        <View>
         <ActivityIndicator size={40} color='#a020f0' />
        <Text style={{textAlign:'center'}}>Checking availability</Text>
        </View>
       
        }


       

    </View>
   
    )} 
       </View>
       : <ActivityIndicator size={150} style={{padding:100}}color='#a020f0'/>  }

         

       
  
    </View>
  )
}

export default SeatsScreen

const styles = StyleSheet.create({
  seatGroups:{
    flexDirection:'row',
    justifyContent: 'space-between',
    
  },
  middleSeats:{
    justifyContent:'flex-end'
  },
  keys:{
    // flexDirection:'row',
    margin:10,
    backgroundColor:'white',
    padding:5
  },
  stickyHeader:{
    backgroundColor:'#e2e3e5',
    padding:20,
    position:'absolute',
    width:'100%',
    zIndex:100,
    bottom:0
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