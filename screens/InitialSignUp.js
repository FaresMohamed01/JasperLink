import { StyleSheet, Text, TextInput, View, Button, Image,ImageBackground} from 'react-native'
import React, {useState} from 'react'
import TopHeaderBar from '../modules/TopHeaderBar'
import redx from '../assets/Red_x.png'
import { styles } from '../Style';

const InitialSignUp = ({navigation}) => {
    const [email, setEmail] = useState('')
    const pattern = new RegExp("^[a-zA-Z0-9+_.-]+@manhattan.edu$");
    const [isValid, setIsValid] = useState(true);
    

    const validateEmail = (email) => {
        if (pattern.test(email)) {
            setIsValid(true);
        } else{
            setIsValid(false);
        }
    }

  return (
    <View style = {styles.container}>
         <ImageBackground style = {styles.background_image} source={require('../assets/background.jpg')}>

        <View>
            <TopHeaderBar navigation={navigation}/>
        </View>

        <View style={styles.login_border}>

            <Text style={styles.login_text}> Verify MC Account </Text>

            <ImageBackground source={require('../assets/MC_Round_Icon.png')} style={styles.Initial_SignUp_Image}/>

            <Text style={styles.login_email}> Email </Text>

            <View style={styles.login_email_border}>

                <TextInput 
                    style = {styles.login_email_text}
                    placeholder="Email@manhattan.edu"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(email) => {setEmail(email); validateEmail(email)}}
                    value={email}
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

            <View style={styles.Initial_SignUp_Button_Border}>
                <Button title="Submit" onPress={() => isValid?navigation.navigate('SignUp', {email: email}):null} color={'white'} />
            </View>

            </View>

        </ImageBackground>
    </View>
  )
}

export default InitialSignUp