import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookItem from '../components/BookItem'
import bus_api from '../../apis/bus_api'
import { useContext } from 'react'
import { BusContext } from '../../App'
import { ActivityIndicator } from 'react-native'
import EmptyList from '../components/EmptyList'

const ManageScreen = () => {
  const {usr_id} = useContext(BusContext);
  const [error,setError] = useState('');
  const [book_data,setBookData] = useState([]);
  const [n,setN] = useState('');

  const getBookings = async() =>{
    try{
     const response = await bus_api.post('bus_app/ticket/view/',{
      usr_id:usr_id
     });
     setBookData(response.data.res);
     console.log(response.data);
     setN('Ok');
    }catch(err){
      console.log(err);
      setError('Something went wrong');
    }
  }
  
  useEffect(()=>{
   getBookings();
  },[n])
  return (
    <View>
      {n ?
      <View>

      {book_data.length !== 0 ?
        <FlatList 
        data={book_data}
        keyExtractot={(item) => item.book_id}
        renderItem={({item}) =>{
          return(
            <BookItem item={item} getBookings={getBookings} />    
          )
        
        }}
      />  
      : <EmptyList msg='No bookings' />
      }
  
      </View>
   
       : 
        <ActivityIndicator style={{padding:100}}  size={100} color='#a020f0' />}
     
     
    </View>
  )
}

export default ManageScreen

const styles = StyleSheet.create({

})