import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Settings = ({navigation}) => {
  return (
    <View>
     <TouchableOpacity
        style = {styles.input}
        onPress={() =>navigation.navigate('Profile')}
    >
    <Text style={styles.Text}>Change Profile Information</Text>

    </ TouchableOpacity>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})
