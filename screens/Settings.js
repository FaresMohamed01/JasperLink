//Settings Page
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../Style';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';

const Settings = ({navigation}) => {

  const SignOut = () =>  {
    SignOut(auth)
    .then(() => {
        navigation.navigate("Login")
    }).catch(error => alert(error.message))
  }

  return (
    <View style = {styles.page}>
       <View>
        <TopHeaderBar navigation={navigation}/>
      </View>

    <View style = {styles.settings_top_text_border}>
      <Text style = {styles.settings_top_text}>
        Settings
      </Text>
    </View>

    <SafeAreaView style = {styles.flatlist}>

     <TouchableOpacity
        style = {styles.settings_text_border}
        onPress={() =>navigation.navigate('Profile')}
    >
    <Text style={styles.settings_text}>Change Profile Information</Text>

    </ TouchableOpacity>

    <TouchableOpacity
        style = {styles.settings_text_border}
        onPress={() =>navigation.navigate('AboutUs')}
    >
    <Text style={styles.settings_text}>About Us</Text>

    </ TouchableOpacity>

    <TouchableOpacity
      style = {styles.settings_text_border}
      onPress={() =>navigation.navigate('Login')}
    >
      <Text style={styles.settings_text}>Sign Out</Text>
    </ TouchableOpacity>

    </SafeAreaView>

    <View style = {styles.settings_navs}>
        <ButtonNavBar navigation={navigation}/>
    </View>

      

    </View>
  )
}

export default Settings
