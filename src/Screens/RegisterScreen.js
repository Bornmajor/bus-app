import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-paper'
import { Button } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { useContext } from 'react';
import bus_api from '../../apis/bus_api';
import { BusContext } from '../../App';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const {theme,storeUsrIdKey,usr_id} = useContext(BusContext);

  const navigation = useNavigation();
  const [pwd,setPwd] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [error,setError] = useState('');
  const[feedback,setFeedback] = useState('');
  const [loginKey,setLoginKey] = useState(null);



  const validateForm = () =>{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
   if(email == ''){
      alert('Email field required');
   }else if(username == ''){
      alert('Name field required');
   }else if(email == ''){
      alert('Email field required');
   }else if(pwd == ''){
      alert('Password field required');
   }else if(!emailRegex.test(email)){
      alert('Valid email required');
   }else{
      addUser();

      setPwd();
      setEmail();
      setUsername();

  
      setTimeout(() => {
        setFeedback();
      }, 8000);
      
      if(loginKey !== null){
        navigation.navigate('Home');
      }

    }


     
  }

  const addUser = async () => {
  try{
    const response = await bus_api.post('bus_app/registration/',{
      username:username,
      email:email,
      pwd:pwd
    });
   console.log(response.data);
   setFeedback(response.data.message);
   if(response.data.res !== 0){
    storeUsrIdKey('usr_id',response.data.res);
    setLoginKey('ok');
   }
   
  }catch(err){
   console.log(err)
   setError('Something went wrong');
  }
  }

 
    return (
    <View style={styles.container}>
      <Image source={require('../../assets/bus.png')} 
      style={{width:300,height:150}}
      />
      {error? <Chip theme={theme} style={styles.feedback} icon='information'>{error}</Chip>: null}
      {feedback ? <Chip theme={theme}  style={styles.feedback} icon="information" >{feedback}</Chip> : null}
      <TextInput 
      style={styles.textInput}
      label='Email'
      value={email}
      mode='outlined'
      onChangeText={t => setEmail(t)}
      />
      <TextInput 
      style={styles.textInput}
      label='Names'
      value={username}
      mode='outlined'
      onChangeText={t => setUsername(t)}
      />
      <TextInput 
      style={styles.textInput}
      label='Password'
      value={pwd}
      mode='outlined'
      onChangeText={t => setPwd(t)}
      secureTextEntry={true}
    
      />

      <Button
      theme={theme}
      onPress={() => validateForm()}
       style={styles.btn}
       mode="contained">
      Register
    </Button>

    <Button
      theme={theme}
      onPress={() => navigation.navigate('Login')}
       style={styles.btn}
       mode="contained">
      Login
    </Button>

    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  textInput:{
    margin:10
  },
  btn:{
  margin:10
  },
  container:{
    flex:1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  feedback:{
    margin:10,

  }
})