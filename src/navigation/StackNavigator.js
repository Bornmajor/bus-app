import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import DateScreen from '../Screens/DateScreen';
import BusScreen from '../Screens/BusScreen';
import SeatsScreen from '../Screens/SeatsScreen';
import ConfirmationScreen from '../Screens/ConfirmationScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ManageScreen from '../Screens/ManageScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { useContext } from 'react';
import { BusContext } from '../../App';



const Stack = createStackNavigator();


const StackNavigator = () => {
  const {storeUsrIdKey,usr_id,setUsrId} = useContext(BusContext);
  


  return (

   <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'> 
    {usr_id !== null ? 
    (
      <>
        <Stack.Screen 
      name='Manage'
      component={ManageScreen}
      options={{
        title: 'Manage ticket',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
      />
      <Stack.Screen 
      name='Profile'
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
      />
      </>
    ):(
      <>
      </>
    )}
         <Stack.Screen
      name='Home'
      component={HomeScreen} 
      options={{
        title: 'Eagle bus',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
     initialParams={{ setUsrId,usr_id }}
      />
        <Stack.Screen
      name='Date'
      component={DateScreen} 
      options={{
        title: 'Find a trip',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
      />
      <Stack.Screen
      name='Bus'
      component={BusScreen}
      options={{
        title: 'Find a bus',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
      />
      <Stack.Screen 
      name='Seats'
      component={SeatsScreen}
      options={{
        title: 'Find your seat',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
      />
      <Stack.Screen 
      name='Confirm'
      component={ConfirmationScreen}
      options={{
        title: 'Confirm screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
      />
      <Stack.Screen
      name='Login'
      component={LoginScreen}
      options={{
        title: 'Login screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
     initialParams={{ setUsrId }}

      />
      <Stack.Screen
      name='Register'
      component={RegisterScreen}
      options={{
        title: 'Register account',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#a020f0'}
     }}
     initialParams={{ setUsrId }}

      />
   
 



    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})