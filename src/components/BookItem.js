import { StyleSheet, Text, View,Pressable,Switch } from 'react-native'
import React, { useEffect,useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import bus_api from '../../apis/bus_api';
import { ToastAndroid } from 'react-native';
import * as Notifications from 'expo-notifications';


const BookItem = ({item,getBookings}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [error,setError] = useState([]);
    const [dest,setDest] = useState('');
    const [n,setN] = useState('');
    const [d,setD] = useState('');

    const showToast = () => {
        ToastAndroid.show('Not refundable!', ToastAndroid.SHORT);
      };

    const getRoute = async() =>{
        try {
        const response = await bus_api.post('bus_app/get_route/',{
        route_id: item.route_id
        });    
        console.log(response.data.res);
        setDest(response.data.res);
        setN('ok');
        }catch(err){
            console.log(err);
            setError('Something went wrong');
        }
    } 

    const getFare = async() =>{
        try{
         const response  = await bus_api.post();

        }catch(err){
            console.log(err);
        }
    }

    const deleteBooking = async () =>{
        try{
        const response = await bus_api.post('bus_app/ticket/delete/',{
        book_id: item.book_id
        });    
        console.log(response.data.res);
        if(response.data.res == 1){
            showToast();
            getBookings();
        }
       // setDest(response.data.res);
        setD('ok');   

        }catch(err){
            console.log(err);
            setError('Something went wrong')
        }
    }
 

    useEffect(()=>{
     getRoute();
    },[n])

  return (
    <View style={styles.item}>
        
     <View style={styles.bus_info}>

   

        <FontAwesome5 name="bus-alt" size={85} color="black" />
        <Text> # {item.book_id}</Text>

        <Text>Amenities</Text>
            <View style={styles.amenities}>
            <FontAwesome5 style={styles.icon} name="wifi" size={24} color="black" />
            <FontAwesome5 style={styles.icon} name="tv" size={24} color="black" />
            <FontAwesome5  style={styles.icon} name="charging-station" size={24} color="black" />
            </View>

        </View>

        <View style={{padding:5,flexDirection:'row'}}>

        <View style={styles.other_info}>

        <Text style={styles.txt}>From
        <Feather name="arrow-right" size={20} color="black" />
         <Text style={{fontWeight:'800'}}>{dest ? dest[0].from_place: null }</Text>  
         </Text>
        <Text style={styles.txt}>To <Feather name="arrow-right" size={20} color="black" /> 
        <Text style={{fontWeight:'800'}}>{dest ? dest[0].to_place: null }</Text></Text>  

        <View style={styles.date_info}>
             <Text>
            Date 
        <Feather name="arrow-right" size={15} color="black" />
        <Text style={{fontWeight:'800'}}>{item.date_booked} </Text> 
             </Text>
          <Text>
            Departure Time
            <Feather name="arrow-right" size={15} color="black" />
            <Text style={{fontWeight:'800'}}>{item.depart_time}</Text>  
            </Text>

        </View>


        <View style={{flexDirection: 'row',margin:5,alignItems: 'center'}}>
        <MaterialCommunityIcons name="car-seat" size={30} color="black" />
        <Text>(seat no)</Text>
        <Feather name="arrow-right" size={25} color="black" />
         <Text style={styles.txt}>{item.seat_no}</Text>
        </View>

        <View style={{flexDirection: 'row',margin:5,alignItems: 'center'}}>
        <FontAwesome5 name="money-bill-wave" size={24} color="black" />
        <Feather name="arrow-right" size={25} color="black" />
         <Text style={styles.txt}>{item.fare}</Text>
        </View>

  
      
        </View>

        <Pressable style={styles.btn} onPress={() => deleteBooking()}>
        <AntDesign name="closecircle" size={30} color="black" />
        </Pressable>
        
    
       
        </View>

   

    </View>
  )
}

export default BookItem

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#e2e3e5',
        // padding:10,
        margin:10,
        flexDirection:'row',
        // alignItems: 'center',
        justifyContent: 'center',
    
      },
      amenities:{
        flexDirection:'row',
        marginVertical:10
    },
    bus_info:{
    // flexDirection:'row',
    margin:10,
    // justifyContent:'center',
    alignItems:'center',

    position: 'relative'  
    },
    btn:{
    
    },
    icon:{
        marginHorizontal:5
    },
    txt:{
        fontSize:18
    },
    other_info:{
        marginVertical:5
    },
    date_info:{
     backgroundColor: 'white',
     borderRadius:5,
     padding:5
     
    }
})