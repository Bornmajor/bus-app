import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { createContext, useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export const  BusContext = createContext();

export default function App() {
  const [data,setData] = useState();  
  const [showSeatHeader,setShowSeatHeader] = useState(false);
  const [bookedSeat,setBookedSeat] = useState('');


  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [bookedDate,setBookedDate] = useState('');
 const [usr_id,setUsrId] = useState('');
  const[listBookedSeats,setListBookedSeats] = useState([]);
  const [departure,setDeparture] = useState('');
  const [routeId,setRouteId] = useState('');

  const [seatStat,setSeatStat] = useState('');
  const [fare,setFare] = useState('');
  

  const theme = useTheme();
  theme.colors.primary = '#a020f0';

  const storeUsrIdKey = async (usr_id,val) =>{
    await SecureStore.setItemAsync(usr_id,val);
    console.log('Key stored:'+val);
  }
  
  const getUserIdKey = async () =>{
    let result = await SecureStore.getItemAsync('usr_id');
 
     setUsrId(result);
   }
 
 
  useEffect(()=>{
    getUserIdKey();
  },[usr_id])



   
   
  return (
    <BusContext.Provider value={{
      usr_id,
      setUsrId,
      storeUsrIdKey,
      bookedSeat,
    setBookedSeat,
    showSeatHeader,
    setShowSeatHeader,
    bookedDate,
    setBookedDate,
    from,
    setFrom,
    to,
    setTo,
    theme,
    listBookedSeats,setListBookedSeats,
    departure,setDeparture,
    routeId,setRouteId,
    seatStat,setSeatStat,
    fare,setFare
    }}>
       <StackNavigator  /> 

    </BusContext.Provider>
 
 
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
