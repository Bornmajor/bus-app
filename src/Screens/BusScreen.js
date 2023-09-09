import { StyleSheet, Text, View,FlatList ,ActivityIndicator,ActionSheetIOS} from 'react-native'
import React, { useEffect, useState } from 'react'
import BusItem from '../components/BusItem'
import bus_api from '../../apis/bus_api'
import { useContext } from 'react'
import { BusContext } from '../../App'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const BusScreen = () => {
  const {from,to,bookedDate} = useContext(BusContext);
  const [busList,setBusList] = useState([]);
  const [error,setError] = useState('');
  const [n,setN] = useState(null);
  const [noRoute,setNoRoute] = useState(false);
  const navigation = useNavigation();


  useEffect(()=>{
    getRoute();
  },[n])
  const getRoute = async() =>{
    try{
      const response = await bus_api.post('bus_app/routes/',{
        date: bookedDate,
        from_place: from,
        to_place:to 

      })
      console.log(response.data);
      setBusList(response.data.res);
      setN('ok');
      if(response.data.res == 0){
         setNoRoute(true);
      }
    }catch(err){
       console.log(err);
       setError('Something went wrong');
    }
  }
  return (
    <View>
      {noRoute && (
       <View style={{justifyContent:'center',alignItems:'center',padding:40}}>
        <Text style={{textAlign:'center',fontSize:30}}>Route unavailable</Text>  
        <Button mode='contained' icon='keyboard-backspace' style={{margin:20}} onPress={() => navigation.navigate('Date')}> Go back</Button>
      </View>  
      )}
   
     
       {n ? <FlatList 
      data={busList}
      keyExtrator={(item) => item.depart_time}
      renderItem={({item}) =>{
        return(
     <BusItem route_id={item.route_id}  from={from} to={to} dept_time={item.depart_time} />
        )
      }}
      /> 
      : <ActivityIndicator size={150} style={{padding:100}}color='#a020f0'/> }
     
    
 
    </View>
  )
}

export default BusScreen

const styles = StyleSheet.create({})