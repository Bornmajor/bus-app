import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const KeyDetails = () => {
  return (
    <View style={styles.keys}>

        
    <View style={styles.key_values}>
        
    <View style={{flexDirection:'row'}}>
    <Text style={{margin:5}}>First</Text> 
    <View style={{backgroundColor:'blue',height:3,width:25,alignSelf:'center'}}></View> 
    </View>

    <View style={{flexDirection:'row'}}>
    <Text style={{margin:5}}>Business</Text> 
    <View style={{backgroundColor:'green',height:3,width:25,alignSelf:'center'}}></View> 
    </View>

    <View style={{flexDirection:'row'}}>
    <Text style={{margin:5}}>Economy</Text> 
    <View style={{backgroundColor:'orange',height:3,width:25,alignSelf:'center'}}></View> 
    </View>

    <View style={{flexDirection:'row'}}>
    <Text style={{margin:5}}>Booked seat</Text> 
    <View style={{backgroundColor:'#f797a0',height:3,width:25,alignSelf:'center'}}></View> 
    </View> 

    </View>

     
  </View>
  )
}

export default KeyDetails

const styles = StyleSheet.create({
    keys:{
        // flexDirection:'row',
        margin:10,
        backgroundColor:'white',
        padding:5
      },
})