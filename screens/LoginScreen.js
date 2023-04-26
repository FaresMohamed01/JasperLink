import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import {auth} from '../firebase';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { styles } from '../Style';
import TopHeaderBar from '../modules/TopHeaderBar';

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
        .catch(error => alert(error.message))

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

            <View>
              <TopHeaderBar navigation={navigation}/>
            </View>

            <View style={styles.login_border}>
           
                <Text style={styles.login_text}> Login </Text>

                <Text style={styles.login_email}> Email </Text>

                <View style={styles.login_email_border}>

                    <TextInput 
                        style = {styles.login_email_text}
                        value = {Email}
                        onChangeText = {onChangeEmail}
                        placeholder = " example@manhattan.edu"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                    />
            
                    <Image style={styles.login_email_icon}
                        source={require('../assets/email_image.png')}>
                    </Image>

                </View>

                    <Text style={styles.login_email}> Password </Text>

                    <View style={styles.login_email_border}>

                        <TextInput 
                            style = {styles.login_password_text}
                            value = {Password}
                            secureTextEntry
                            onChangeText = {onChangePassword}
                            placeholder = "Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
            
                        <Image style={styles.login_password_icon}
                            source={require('../assets/password_icon.png')}>
                        </Image>
            
                     </View>

                    <TouchableOpacity
                        onPress={forget_password}
                    >
                    <Text style={styles.forgot_password}>Forget Password?</Text>

                    </ TouchableOpacity>

                    <View style={styles.login_button_border}>
                        <TouchableOpacity 
                            style = {styles.input}
                            Emailverified
                            onPress={LoginAuth} 
                        >

                        <Text style={styles.login_button}>SIGN IN</Text>
            
                        </ TouchableOpacity>
                    </View>

                    <Text style={styles.new_user_text}>New User?</Text>

                    <TouchableOpacity
                        onPress={() =>navigation.navigate('SignUp')}
                    >
                    <Text style={styles.new_user_button}>Register</Text>

                    </ TouchableOpacity>

                </View>

              

      </ImageBackground>
    </View>
  );
};

export default LoginScreen;