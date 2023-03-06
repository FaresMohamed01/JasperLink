import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import {auth} from '../firebase';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';

const LoginScreen = ({navigation}) => {
    const [Email, onChangeEmail] = useState(null);
    const [Password, onChangePassword] = useState(null);
    const [buttonText, setButtonText] = useState("Login")

    useEffect(() => {
        const loggedin = auth.beforeAuthStateChanged(user => {
          if (user) {
            navigation.navigate("Home")
          }
        })
    
        return loggedin
      }, [])

     //creates a user in firebase
     const LoginAuth = ({navigation}) => {
        signInWithEmailAndPassword(auth, Email,Password)
        .catch(error => alert(error.message))

     }


    return (
        <SafeAreaView style={styles.container}>

            <Image
                source={require('../assets/ManhattanLogo.png')}>
            </Image>

            <TextInput
                style={styles.inputTop}
                onChangeText={onChangeEmail}
                placeholder = "admin@manhattan.edu"
                keyboardType="email-address"
                
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={Password}
                placeholder="Password"
                keyboardType="default"
                verticalAlign='middle'
                secureTextEntry
            />

            <Button  style = {styles.button}
                onPress = {LoginAuth}
                title={buttonText}
                
            ></Button>

        </SafeAreaView>
  );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8fbc8f',
        justifyContent: 'center',
    },

    input: {
        fontSize: 25,
        fontFamily: 'Noteworthy',
        borderColor: 'black',
        margin: 10,
        borderWidth: 3,
        padding: 10,
        width:275,
        borderRadius:10
    },

    inputTop: {
        fontSize: 25,
        fontFamily: 'Noteworthy',
        borderColor: 'black',
        margin: 10,
        borderWidth: 3,
        padding: 10,
        width:275,
        borderRadius:10
    },

    button: {
        fontSize: 20,
        fontFamily: 'Noteworthy',
        margin: 25,
    },
  


});

export default LoginScreen;