import { StyleSheet, Text, View,Pressable,Image,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext } from 'react';
import { BusContext } from '../../App';
import { useNavigation } from '@react-navigation/native';
import bus_api from '../../apis/bus_api';
import { Button } from 'react-native-paper';


const DateScreen = () => {

    const {from,setFrom,to,setTo,bookedDate,setBookedDate,theme} = useContext(BusContext);
    const navigation = useNavigation();
//    const [from,setFrom] = useState();
//    const [to,setTo] = useState();
    const [date,setDate] = useState(new Date());
    const [error,setError] = useState('');
    const[locations,setLocations] = useState([]);
    const [n,setN] = useState('');

  useEffect(()=>{
   getLocation();
  },[n]);

  const getLocation = async() =>{
    try{
      const response = await bus_api.get('bus_app/location/');
      console.log(response.data.res);
      setLocations(response.data.res);
      setN('ok');
    

    }catch(err){
     console.log(err);
     setError('Something went wrong');
    }

  }

   const [showDate,setShowDate] = useState(false);

   const onChangeDate = (event, selectedDate) => {
  
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(selectedDate);
    setBookedDate(currentDate.toISOString().split('T')[0]);  

  };



  const verifyData = () => {
   if(from == ''){
     alert('Boarding place (from) required')
   }else if(to == '') {
    alert('Final destination (to) required')
   }else if(bookedDate == ''){
     alert('Booking date required');
   }else{
     navigation.navigate('Bus');
   }
    
//    setBookedDate(date.toISOString().split('T')[0]);   
  }

  return (
    <View>
          <Image source={require('../../assets/bus.png')} 
        style={{width:300,height:150}}
        />
        <View style={styles.dataView}>
            
            {bookedDate ? <Text>Date picked: {bookedDate} </Text> : null}
            {from ? <Text>From: {from}</Text>: null}
            {to ? <Text>To: {to}</Text>: null}
        
        </View>

        {showDate && (
         <DateTimePicker 
          value={date}
          mode='date'
          onChange={onChangeDate}

        />   
        )}
       

        
        <Button icon='calendar' mode='outlined'style={styles.btn} onPress={() => setShowDate(true)}>Pick a date</Button>
      
           <View style={styles.pickContainer}>
            {/* <Text style={styles.txt}>From</Text> */}
            <Picker
            style={{backgroundColor: '#a020f0',color:'white'}}
            selectedValue={from}
            onValueChange={(itemValue,itemIndex) =>
            setFrom(itemValue)
            }
            dropdownIconColor='white'
                
            >
                <Picker.Item label="Pick boarding place" value="" />
                {locations.map((item,index) =>(
                  <Picker.Item label={item.reg_title} value={item.reg_title} />
                ))}
            
                
            </Picker>
           </View>

           <View style={styles.pickContainer}>
            {/* <Text style={styles.txt}>To</Text> */}
            <Picker
            style={{backgroundColor: '#a020f0',color:'white'}}
            selectedValue={to}
            onValueChange={(itemValue,itemIndex) =>
            setTo(itemValue)
            }
            dropdownIconColor='white'
                
            >    
                <Picker.Item label="Pick destination place" value="" />
                {locations.map((item,index) =>(
                  <Picker.Item label={item.reg_title} value={item.reg_title} />
                ))}
                
            </Picker>
           </View>
          
            <Button mode='contained' style={styles.btn} onPress={() => verifyData()}>Proceed</Button>
    </View>
  )
}

export default DateScreen

const styles = StyleSheet.create({
    btn:{
  
        margin:10,
        borderRadius:8
    },
    btnText:{
        color:'white',
        fontSize:20
    },
    txt:{
        fontSize:20
    },
    pickContainer:{
        margin:10
    },
    dataView:{
        backgroundColor: '#ffffff',
        padding:20,
        margin:10
    }

})