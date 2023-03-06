import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import {auth} from '../firebase';
import { getAuth,createUserWithEmailAndPassword,sendEmailVerification } from 'firebase/auth';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const SignUpScreen = ({navigation}) => {
    
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [ConfirmPassworrd, setConfirmPassword] = useState('');

    const auth = getAuth()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate("Login")
        }
      })
  
      return unsubscribe
    }, [])

    //creates a user in firebase
    const SignUp = ({navigation}) => {
      createUserWithEmailAndPassword(auth, Email, Password)
      .catch(error => alert(error.message))
    }

    const Emailverified = ({navigation}) =>{
      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Please Verify Your Email")
       })

       .catch(error => alert(error.message))
    }

    return (

      <View style = {styles.page}>

          <Image style={styles.image}
              source={require('../assets/ManhattanLogo.png')}>
          </Image>
              
          <TextInput
              style = {styles.email}
              value = {Email}
              onChangeText={Email => setEmail(Email)}
              placeholder = "admin@manhattan.edu"
              autoCapitalize="none"
              keyboardType="email-address"
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
                Emailverified
                onPress={SignUp}
            >
            <Text style={styles.Text}>Create Account using MC Email</Text>
            
            </ TouchableOpacity>

            <TouchableOpacity
                style = {styles.input}
              //  onPress={handleSignUp}
            >
            <Text style={styles.Text}>Forget Password</Text>
            </ TouchableOpacity>

            <TouchableOpacity
                style = {styles.input}
                onPress={() =>navigation.navigate('Login')}
            >
            <Text style={styles.Text}>Login</Text>
            </ TouchableOpacity>

       </View>

    );
};

export default SignUpScreen

const styles = StyleSheet.create({

  page: {
    flex: 1,
    backgroundColor: '#8fbc8f',
    alignItems: 'center',
    justifyContent: 'center',

  },


  email:{
    margin: 10,
    borderWidth: 3,
    padding: 10,
    width:275,
    borderRadius:10,
    fontSize: 25,
    fontFamily: 'Noteworthy',
    borderColor: 'black',
  },

  psw:{
    fontSize: 25,
    fontFamily: 'Noteworthy',
    borderColor: 'black',
    margin: 40,
    borderWidth: 3,
    padding: 10,
    width:275,
    borderRadius:10
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
    margin: 50,
  },

});