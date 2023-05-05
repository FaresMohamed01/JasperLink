//Landing Page
import { SafeAreaView, Text, TouchableOpacity, View,ImageBackground} from 'react-native'
import React from 'react'
import TopHeaderBar from '../modules/TopHeaderBar';
import { styles } from '../Style';

const LandingScreen = ({navigation}) => {
  return (
    <View style ={styles.page}>

        <View>
          <TopHeaderBar navigation={navigation}/>
        </View>
      
      <SafeAreaView>

          <View >

            <Text style={styles.Landing_Page_Title}>Welcome to JasperLink</Text>

            <ImageBackground source={require('../assets/Landing_Page_Image.jpg')} style={styles.landingimage}/>

            <Text style={styles.Landing_Page_Welcome_Section}>Welcome to JasperLink, a social media application developed by a group of students as part of our Capstone project at Manhattan College. Our team is dedicated to creating a platform that helps students connect with each other in a closed domain.</Text>

            <Text style={styles.Landing_Page_SignOrLogin_Text}>Please sign up or login to continue</Text>

            <TouchableOpacity style={styles.Landing_SignUp_Button} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.Landing_SignUp_Text}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.Landing_Login_Button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Landing_Login_Text}>Login</Text>
            </TouchableOpacity>

          </View>
      </SafeAreaView>
    </View>
  )
}

export default LandingScreen;
