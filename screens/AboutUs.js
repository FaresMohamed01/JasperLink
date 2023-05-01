import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image,ImageBackground,ScrollView} from 'react-native'
import {auth, db} from '../firebase';
import {collection, doc, where, query, updateDoc} from 'firebase/firestore';
import { styles } from '../Style';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/ButtonNavBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutUs = ({navigation}) => {

  const SignOut = () =>  {

    SignOut(auth)
    .then(() => {
        navigation.navigate("Login")
    })

    .catch(error => alert(error.message))
}

  return (
    <View style = {styles.page}>
        <View>
         <TopHeaderBar navigation={navigation}/>
        </View>
    
        <View style={styles.about_us_border}>

       <Text style={styles.login_text}> About Us </Text>

       <ImageBackground source={require('../assets/MC_Round_Icon.png')} style={styles.Initial_SignUp_Image}/>

       <View style={styles.about_us_text_border}>
            
            <Text style={styles.about_us_text}>Inspired by the need for a social media platform that is tailored specifically to Manhattan College. We set out to create an application that looks and runs well, providing a mode of communication for students to reach out to each other. Our goal is to create a platform that is easy to use and enhances the social experience of Manhattan College students.
            Our team consists of Fares Mohamed, Rutsell Moradel, Nick Rodriguez, and Christian Ochoa.
            Thank you for considering JasperLink as your go-to social media application. We look forward to providing you with a platform that enhances your social experience at Manhattan College.</Text>

        </View>

       </View>
       

       
    <View style = {styles.about_us_navs}>
        <ButtonNavBar navigation={navigation}/>
    </View> 
        
    
</View>
  )
}


export default AboutUs