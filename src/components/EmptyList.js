import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const EmptyList = ({msg}) => {
  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center',fontSize:25}} >{msg}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent: 'center'
    }
})