import React from 'react';
import { useState, useEffect } from 'react';
import {Button,ScrollView, Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import {app, db} from '../firebase';
import {getAuth,createUserWithEmailAndPassword, sendSignInLinkToEmail, signInWithPopup, FacebookAuthProvider, signInWithRedirect, signInWithEmailLink} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';
import { styles } from './Style';
import { GoogleAuthProvider } from 'firebase/auth';


const SignUpScreen = ({navigation}) => {
  const [Email, setEmail] = useState(null);
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const [GPA, setGPA] = useState(null);
  const [information, setInformation] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
 

  const actionCodeSettings = {
    url: 'https://capstoneproject-7ce43.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
    handleCodeInApp: true,
    dynamicLinkDomain: 'capproject.page.link'
  };
  //creates a user in firebase
  const SignUp = async ({navigation}) => {


    await createUserWithEmailAndPassword(auth, Email, Password)

    try{
      addDoc(collection(db,`users`),{
          
          Email: auth.currentUser?.email,
          first: first,
          last: last,
          school: school,
          major:  major,
          GPA: GPA,
          information: information,
          Username: Username,
          Password: Password
        });

        setEmail('');
        setFirst('');
        setLast('');
        setSchool('');
        setMajor('');
        setGPA('');
        setInformation('');
        setUsername('');
        setPassword('');

        alert("Account Created!")
        
      
        }
        catch(error){
          alert("Enter a valid email")
        }
         
          


  }

  
    return (

      <View style = {styles.container}>
        <ImageBackground style = {styles.background_image} source={require('../assets/background.jpg')}>
        <ScrollView>

        <View style={styles.signup_border}>
           
           <Text style={styles.signup_text}> Create Account </Text>
 
           <Text style={styles.email}> Username </Text>
 
           <View style={styles.email_border}>


              <TextInput 
               style = {styles.email_text}
               value = {Username}
               onChangeText={Username => setUsername(Username)}
               placeholder = " John Doe"
               autoCapitalize="none"
               autoCorrect={false}
             />

              <Image style={styles.email_icon}
               source={require('../assets/email_image.png')}>
              </Image>

              </View>

              <Text style={styles.email}> Email </Text>
 
              <View style={styles.email_border}>

              <TextInput 
               style = {styles.email_text}
               value = {Email}
               onChangeText={Email => setEmail(Email)}
               placeholder = " example@manhattan.edu"
               autoCapitalize="none"
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
               onChangeText={Password => setPassword(Password)}
               placeholder = "Password"
               autoCapitalize="none"
               autoCorrect={false}
             />
             
             <Image style={styles.password_icon}
               source={require('../assets/password_icon.png')}>
             </Image>
             
           </View>
 
           <Text style={styles.have_account_text}>Already have an account?</Text>
 
           <TouchableOpacity
                 onPress={() =>navigation.navigate('Login')}
             >
             <Text style={styles.sign_in_button}>Sign In</Text>
 
           </ TouchableOpacity>
 
           <View style={styles.sign_up_button_border}>
             <TouchableOpacity 
               style = {styles.input}              
               onPress = {SignUp}

             >
 
               <Text style={styles.sign_up_button}>SIGN UP</Text>
             
             </ TouchableOpacity>



        
           </View>

  
           
 
        </View>
       
        </ScrollView>
        </ImageBackground>
      </View>
    )
}
    
  
      
   
   
  

 


export default SignUpScreen;
