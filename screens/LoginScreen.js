import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import {auth} from '../firebase';
import { getAuth,signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { styles } from './Style';



const LoginScreen = ({navigation}) => {
    const [Email, onChangeEmail] = useState(null);
    const [Password, onChangePassword] = useState(null);
    const [buttonText, setButtonText] = useState("Login")
    const auth = getAuth();


    const actionCodeSettings = {
        url: 'https://capstoneproject-7ce43.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
        handleCodeInApp: true,
        dynamicLinkDomain: 'capproject.page.link'
      };
    

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
        .catch(error => alert("User Not Found!"))

     }

     const forget_password = ({navigation}) => {
        
        sendPasswordResetEmail(auth, Email, actionCodeSettings)
        .catch(error => alert(error.message))
      }

      const delete_user = ({navigation}) => {
        deleteUser(auth, Email, Password)
        .catch(error => alert(error.message))
      }


      return (
        <View style = {styles.container}>
            <ImageBackground style = {styles.background_image} source={require('../assets/background.jpg')}>
            <ScrollView>
            <Image style={styles.image}
                source={require('../assets/ManhattanLogo.png')}>
            </Image>

            <View style={styles.signup_border}>
           
                <Text style={styles.signup_text}> Login </Text>

                <Text style={styles.email}> Email </Text>

                <View style={styles.email_border}>

                    <TextInput 
                        style = {styles.email_text}
                        value = {Email}
                        onChangeText = {onChangeEmail}
                        placeholder = " example@manhattan.edu"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                    />
            
                    <Image style={styles.email_icon}
                        source={require('../assets/email_image.png')}>
                    </Image>

                </View>

                    <Text style={styles.email}> Password </Text>

                    <View style={styles.email_border}>

                        <TextInput 
                            style = {styles.password_text}
                            value = {Password}
                            secureTextEntry
                            onChangeText = {onChangePassword}
                            placeholder = "Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
            
                        <Image style={styles.password_icon}
                            source={require('../assets/password_icon.png')}>
                        </Image>
            
                     </View>

                    <Text style={styles.NoAccountButton}>Don't have an account?</Text>

                    <TouchableOpacity
                        onPress={() =>navigation.navigate('SignUp')}
                    >
                    <Text style={styles.NoAccountSignUpButton}>Sign Up</Text>

                    </ TouchableOpacity>

                    <Text style={styles.NoAccountButton}>Forget Password?</Text>

                    <TouchableOpacity
                        onPress={forget_password}
                    >
                    <Text style={styles.NoAccountSignUpButton}>Change Password</Text>

                    </ TouchableOpacity>

                    <View style={styles.sign_up_button_border}>
                        <TouchableOpacity 
                            style = {styles.input}
                            Emailverified
                            onPress={LoginAuth} 
                        >

                        <Text style={styles.sign_up_button}>SIGN IN</Text>
            
                        </ TouchableOpacity>
                    </View>

                </View>

                </ScrollView>

      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
