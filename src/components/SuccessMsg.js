import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const SuccessMsg = () => {
  const navigation = useNavigation();
 
  return (
    <View style={{alignItems:'center'}}>
      <Text style={{color:'green',fontSize:30,textAlign:'center',margin:10}}>Successfully booked</Text>
      <View >
       <AntDesign name="checkcircle" size={150} color="green" />  
      </View>
      {/* <Button mode='contained' icon='bus-clock' style={{margin:10,fontSize:35}} >Set a remind</Button> */}
       <Pressable style={styles.btn} onPress={() => navigation.navigate('Manage')}>
          <MaterialCommunityIcons name="ticket" size={20} color="white" /> 
 <Text style={{textAlign: 'center',color:'white',marginHorizontal:10,fontSize:18}}> View tickets </Text>
       </Pressable>

       <Pressable style={styles.btn} onPress={() => navigation.navigate('Home')}>
       <Entypo name="home" size={20} color="white" />
 <Text style={{textAlign: 'center',color:'white',marginHorizontal:10,fontSize:18}}> Home</Text>
       </Pressable>
    </View>
  )
}

export default SuccessMsg

const styles = StyleSheet.create({
btn:{
backgroundColor: 'green',
padding:10,
borderRadius:8,
flexDirection: 'row',
margin:10
}
})