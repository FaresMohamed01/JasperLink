import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import {auth} from '../firebase';
import { getAuth,createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

const HomeScreen = ({navigation}) => {

    const SignOut = () =>  {

        signOut(auth)
        .then(() => {
            navigation.navigate("Login")
        })
    
        .catch(error => alert(error.message))
    }

    return (
        <SafeAreaView >
            <Text>Email:{auth.currentUser?.email}</Text>
            
            <TouchableOpacity
                onPress={SignOut}
             >
                
                <Text>SignOut</Text>

            </ TouchableOpacity>
        </SafeAreaView>
    );
};

export default HomeScreen;

