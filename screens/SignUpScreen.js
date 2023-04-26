import React from 'react';
import { useState, useEffect } from 'react';
import {Button,ScrollView, Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import {app, db} from '../firebase';
import {getAuth,createUserWithEmailAndPassword, sendSignInLinkToEmail, signInWithPopup, FacebookAuthProvider, signInWithRedirect, signInWithEmailLink} from 'firebase/auth';
import {addDoc, collection,setDoc, doc} from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import { styles } from '../Style';
import { GoogleAuthProvider } from 'firebase/auth';
import TopHeaderBar from '../modules/TopHeaderBar';
import { useNavigationState } from '@react-navigation/native';
import redx from '../assets/Red_x.png'

const SignUpScreen = ({route, navigation}) => {


  const [Email, setEmail] = useState(null);
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [major, setMajor] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  //empty fields
  const [school, setSchool] = useState(null);
  const [GPA, setGPA] = useState(null);
  const [information, setInformation] = useState(null);
  const [Bookmarks, setBookmarks] = useState([]);
  const [Friends, setFriends] = useState([]);

  const pattern = new RegExp("^[a-zA-Z0-9+_.-]+@manhattan.edu$");
    const [isValid, setIsValid] = useState(true);
  const auth = getAuth();

  const validCheck = () => {
    if(Password == confirmPassword){
      setIsValid(false)
    }
    else{
      setIsValid(true)
    }

  }

  const validateEmail = (Email) => {
    if (pattern.test(Email)) {
        setIsValid(true);
    } else{
        setIsValid(false);
    }
}

  
  //creates a user in firebase
  const SignUp = async ({navigation}) => {

   try {

     await createUserWithEmailAndPassword(auth,Email, Password)

     setDoc(doc(db,`users`,`${auth.currentUser?.email}`),{
          
      Email: auth.currentUser?.email,
      first: first,
      last: last,
      school: school,
      major:  major,
      GPA: GPA,
      information: information,
      Username: Username,
      Password: Password,
      Bookmarks: Bookmarks,
      Friends: Friends,
      image: image
    });
        alert("Account Created!")
      }

   
    catch(error){
      alert ("Error! Check your Information")
    }
    

  }


  


  return(
    <View style = {styles.container}>
        
        <ImageBackground style = {styles.background_image} source={require('../assets/background.jpg')}>
          
        <View>
            <TopHeaderBar navigation={navigation}/>
        </View>


        <View style={styles.signup_border}>
           
           <Text style={styles.signup_text}> Create Account </Text>
 
           <Text style={styles.signup_email}> Username </Text>
 
           <View style={styles.signup_email_border}>

              <TextInput 
               style = {styles.signup_email_text}
               value = {Username}
               onChangeText={Username => setUsername(Username)}
               placeholder = " John Doe"
               autoCapitalize="none"
               autoCorrect={false}
             />

              <Image style={styles.signup_email_icon}
               source={require('../assets/email_image.png')}>
              </Image>

          </View>

          <Text style={styles.login_email}> Email </Text>

            <View style={styles.login_email_border}>

                <TextInput 
                    style = {styles.login_email_text}
                    placeholder="Email@manhattan.edu"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(Email) => {setEmail(Email); validateEmail(Email)}}
                    value={Email}
                />

                <Image style={styles.login_email_icon}
                        source={require('../assets/email_image.png')}>
                </Image>
            
                {isValid?null:
                    <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                        <Image source={redx} style={{width: 20, height: 20, position:'absolute', left:'5%'}}/>
                        <Text style={{color:'red'}}>Please enter a valid MC email address</Text>
                    </View>
                }

            </View>
 
           <Text style={styles.signup_email}> Password </Text>
 
           <View style={styles.signup_email_border}>
 
             <TextInput 
               style = {styles.signup_password_text}
               value = {Password}
               secureTextEntry
               onChangeText={Password => setPassword(Password)}
               placeholder = "password"
               autoCapitalize="none"
               autoCorrect={false}
             />
             
             <Image style={styles.signup_password_icon}
               source={require('../assets/password_icon.png')}>
             </Image>
             
           </View>

           <Text style={styles.signup_email}> Confirm Password </Text>

           <View style={styles.signup_email_border}>
 
             <TextInput 
               style = {styles.signup_password_text}
               value = {confirmPassword}
               secureTextEntry
               onChangeText={confirmPassword => {setConfirmPassword(confirmPassword); validCheck();}}
               placeholder = "confirm password"
               autoCapitalize="none"
               autoCorrect={false}
             />
             
             <Image style={styles.signup_password_icon}
               source={require('../assets/password_icon.png')}>
             </Image>

             {isValid && <Image style={{height:20,width:20,left:60,bottom:2}} source={require('../assets/Red_x.png')}>
              
              </Image>}
            {isValid&&<Text style = {styles.signup_dont_match}>
              Passwords do not match
            </Text>}

              
            
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
               onPress={SignUp}

             >
 
               <Text style={styles.sign_up_button}>SIGN UP</Text>
             
             </ TouchableOpacity>

           </View>

        </View>

        </ImageBackground>
      </View>
  )
  }

   
  

 


export default SignUpScreen;