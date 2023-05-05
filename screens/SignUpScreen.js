//Sign Up Page
import React from 'react';
import { useState} from 'react';
import {Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import {firebase, db} from '../firebase';
import {setDoc, doc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { styles } from '../Style';
import TopHeaderBar from '../modules/TopHeaderBar';
import redx from '../assets/Red_x.png'

const SignUpScreen = ({navigation}) => {
  //Needed information for sign up and user profile
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [major, setMajor] = useState(null);
  const [image, setImage] = useState(null)
  const [school, setSchool] = useState(null);
  const [GPA, setGPA] = useState(null);
  const [information, setInformation] = useState(null);
  
  //Pattern to check Email is @manhattan.edu
  const pattern = new RegExp("^[a-zA-Z0-9+_.-]+@manhattan.edu$");
  const [EmailisValid, setEmailIsValid] = useState(true);
  const [PasswordisValid, setPasswordIsValid] = useState(true);
  
  const auth = getAuth();

  //To get firebase url information for API Call
  const actionCodeSettings = {
    url: 'https://capstoneproject-7ce43.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
    handleCodeInApp: true,
    dynamicLinkDomain: 'capproject.page.link'
  };
     
  //Specifically checking for passwords
  function validCheck (Password) {
    if(Password != confirmPassword){
      setPasswordIsValid(false)
    }
    else{
      setPasswordIsValid(true)
    }

  }

  //Specifically checking for emails
  function validateEmail(Email) {
    if (pattern.test(Email)) {
        setEmailIsValid(true);
    } else{
        setEmailIsValid(false);
    }
  }

  //creates a user in firebase
  const SignUp = async () => {

    if (pattern.test(Email) && Password == confirmPassword){
      await firebase.auth().createUserWithEmailAndPassword(Email, Password)

      .then (() => {
        firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
        .then(() => {
          alert ('Verify Your Email!')
        }).catch((error) => {
          alert("Error")
        })
        const loggedin = auth.beforeAuthStateChanged(user => {
          if (user.emailVerified) {
          setDoc(doc(db,`users`,`${auth.currentUser?.email}`),{
            Email: auth.currentUser?.email,
            Name: Name,
            Password: Password,
            school: school,
            major:  major,
            GPA: GPA,
            information: information,
            image: image
          })
        }
        else {
          alert("Error")

          setEmail(null)
          setName(null)
          setPassword(null)
          setConfirmPassword(null)
        }
      })
      })
      .catch((error) => {
        alert("Email already Exists!")
      })
    }
    else{
      alert ("Check your email and password!")
    }
  }
  
  //Return all information on signup page
  return(
    <View style = {styles.container}>
        <ImageBackground style = {styles.background_image} source={require('../assets/background.jpg')}>

        <View>
            <TopHeaderBar navigation={navigation}/>
        </View>

        <View style={styles.signup_border}>
           
           <Text style={styles.signup_text}> Create Account </Text>
 
           <Text style={styles.signup_email}> Full Name</Text>
 
           <View style={styles.signup_email_border}>

              <TextInput 
               style = {styles.signup_email_text}
               value = {Name}
               onChangeText={Name => setName(Name)}
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
                    placeholder="jdoe@manhattan.edu"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(Email) => {setEmail(Email); validateEmail(Email)}}
                    value={Email}
                />

                <Image style={styles.login_email_icon}
                        source={require('../assets/email_image.png')}>
                </Image>
            
                {EmailisValid?null:
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

             {PasswordisValid && <Image style={{height:20,width:20,left:60,bottom:2}} source={require('../assets/Red_x.png')}>
              
              </Image>}
            
            {PasswordisValid&&<Text style = {styles.signup_dont_match}>
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
