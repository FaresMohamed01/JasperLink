import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddPosts from './screens/AddPosts';
import Profile from './screens/Profile';
import NavBar from './modules/NavBar';
import Comments from './screens/Comments';
import {firebase} from './firebase';
import PostCard from './modules/Posts';
import Messaging from './screens/DirectMessage';
import Settings from './screens/Settings';
import ChatRoom from './screens/ChatRoom';
import FullProfile from './screens/FullProfile';


const Stack = createNativeStackNavigator();


const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: false
            }} 
            name="SignUp" component={SignUpScreen} 
            />
        
        <Stack.Screen name="Login" options={{
          headerShown: false
            }}  component={LoginScreen} />

        <Stack.Screen name = "NavBar" options={{
          headerShown: false
            }} component={NavBar}/>
        
        <Stack.Screen name="Home"component={HomeScreen} />    

        <Stack.Screen name="AddPosts"options={{
           
            }}  component={AddPosts} />     

        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen name="Posts" component={PostCard} />  

        <Stack.Screen name="comments" component={Comments} />  
        <Stack.Screen name="messaging" component={Messaging} />  
        <Stack.Screen name="Settings" component={Settings} />  
        <Stack.Screen name="ChatRoom" component={ChatRoom} /> 
        <Stack.Screen name="FullProfile" component={FullProfile} /> 
 
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
