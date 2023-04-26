import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

const Settings = ({navigation}) => {

  const SignOut = () =>  {

    SignOut(auth)
    .then(() => {
        navigation.navigate("Login")
    })

    .catch(error => alert(error.message))
}

  return (
    <SafeAreaView>
     <TouchableOpacity
        style = {styles.input}
        onPress={() =>navigation.navigate('Profile')}
    >
    <Text style={styles.Text}>Change Profile Information</Text>

    </ TouchableOpacity>

    <TouchableOpacity
                 onPress={() =>navigation.navigate('Login')}
             >
             <Text>Sign Out</Text>
 
          </ TouchableOpacity>

    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({})