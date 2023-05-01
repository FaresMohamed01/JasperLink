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
import PostCard from './modules/PostCard';
import Messaging from './screens/DirectMessage';
import Settings from './screens/Settings';
import ChatRoom from './screens/ChatRoom';
import FullProfile from './screens/FullProfile';
import UserComments from './screens/UserComments';
import { connectSearchBox } from 'react-instantsearch-native';
import SearchBox from './screens/SearchBox';
import InfiniteHits from './screens/InfiniteHits';
import RefinementList from './screens/RefinementList';
import Search from './screens/Search';
import SearchProfiles from './screens/SearchProfiles'
import LandingScreen from './screens/LandingScreen';
import InitialSignUp from './screens/InitialSignUp';
import AboutUs from './screens/AboutUs';
import Friends from './screens/Friends';
import Archives from './screens/Archives';

const Stack = createNativeStackNavigator();


const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LandingScreen" options={{
          headerShown: false
            }} component={LandingScreen} />
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
        
        <Stack.Screen name="Home"options={{
          headerShown: false
            }}component={HomeScreen} />    

        <Stack.Screen name="AddPosts"options={{
           headerShown: false
            }}  component={AddPosts} />     

        <Stack.Screen name="Profile"options={{
           headerShown: false
            }}  component={Profile} />

        <Stack.Screen name="Posts" component={PostCard} />  
        <Stack.Screen name="comments" options={{
           headerShown: false
            }} component={Comments} />  
        <Stack.Screen name="Messaging" options={{
           headerShown: false
            }} component={Messaging} />  
        <Stack.Screen name="Settings" options={{
           headerShown: false
            }} component={Settings} />  
        <Stack.Screen name="ChatRoom" options={{
           headerShown: false
            }} component={ChatRoom} /> 
        <Stack.Screen name="UserComments" options={{
           headerShown: false
            }} component={UserComments} /> 
        <Stack.Screen name="FullProfile" options={{
           headerShown: false
            }} component={FullProfile} /> 
        <Stack.Screen name="Search" options={{
           headerShown: false
            }} component={Search} /> 

<Stack.Screen name="SearchProfiles" options={{
           headerShown: false
            }} component={SearchProfiles} /> 

  <Stack.Screen name="InfiniteHits" options={{
           headerShown: false
            }} component={InfiniteHits} /> 
    
      <Stack.Screen name="InitialSignUp" options={{
          headerShown: false
            }} component={InitialSignUp} />

<Stack.Screen name="AboutUs" options={{
          headerShown: false
            }} component={AboutUs} />

<Stack.Screen name="Friends" options={{
          headerShown: false
            }} component={Friends} />
            <Stack.Screen name="Archives" options={{
          headerShown: false
            }} component={Archives} />
 
 
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
