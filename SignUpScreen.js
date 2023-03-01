import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import {auth} from '../firebase';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
    
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [ConfirmPassworrd, setConfirmPassword] = useState('');

    const auth = getAuth()

    //creates a user in firebase
    const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, Email, Password)
      .catch(error => alert(error.message))
    }

    return (

      <View style = {styles.page}>

          <Image style = {styles.image} source={require('../assets/MC.jpg')} />

          <Text style={styles.title}>
              Manhattan College Social Network
          </Text>
              
          <TextInput
              style = {styles.email}
              value = {Email}
              onChangeText={Email => setEmail(Email)}
              placeholder = "admin@manhattan.edu"
              autoCapitalize="none"
              autoCorrect={false}
          />

           <TextInput
              style = {styles.psw}
              value = {Password}
              secureTextEntry
              onChangeText={Password => setPassword(Password)}
              placeholder = "Password"
              autoCapitalize="none"
              autoCorrect={false}
           />
                
            <TouchableOpacity
                style = {styles.input}
                onPress={handleSignUp}
            >
            <Text style={styles.Text}>Create Account using MC Email</Text>
            </ TouchableOpacity>
       </View>

    );
};

export default SignUpScreen

const styles = StyleSheet.create({

  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#8fbc8f'

  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Noteworthy',
    position: 'Top',
    margin: 55,
    height: 140,
    borderRadius: 10,
  },

  email:{
    fontSize: 25,
    fontFamily: 'Noteworthy',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1
  },

  psw:{
    fontSize: 25,
    fontFamily: 'Noteworthy',
    margin: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
  },

  psw_confirm :{
    fontSize: 25,
    borderRadius: 100,
    fontFamily: 'Noteworthy',
    borderColor: 'black',
    borderWidth: 1

  },

  Text:{
    fontSize: 20,
    fontFamily: 'Noteworthy',
    margin: 25,
  },

  image:{
   height: 95,
   width: 400,
  },

});
