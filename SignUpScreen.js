import React from 'react';
import { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, Button, View, ImageBackground, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';

const SignUpScreen = () => {
    
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState();
    const [password_confirmation, setpassword_confirmation] = useState();

    

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
            <View style = {styles.input}>

              <Text style={styles.text}>
                Manhattan College Social Network App
              </Text>
              
              <TextInput
                style = {styles.email}
                value = {Email}
                onChangeText={Email => setEmail(Email)}
                placeholder = "admin@manhattan.edu"
              />

              <TextInput
                style = {styles.psw}
                value = {Password}
                placeholder = "Password"
              />

              <TextInput
                style = {styles.psw_confirm}
                value = {password_confirmation}
                placeholder = "Confirm Password"
              />

            </View>

            <View style = {styles.button}>

                <Button
                    style = {styles.input}
                    title="Create Account using MC Email"
                    color="black"
                    fontFamily = "bold"
                    fontSize = "40"
                />
            
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    email: {
        backgroundColor: 'white',
        height: 30,
        borderStyle: 'solid',
        marginBottom: 10,
        marginTop: 35,
    },

    psw: {
        backgroundColor: 'white',
        height: 30,
        borderStyle: 'solid',
        marginBottom: 10,
        marginVertical: 35,
    },

    psw_confirm: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        height: 30,
        marginBottom: 10,
        marginVertical: 35,
    },

    text: {
        fontFamily: 'Cochin', 
        fontSize: 30,
        fontWeight: 'bold',
    },

  });
