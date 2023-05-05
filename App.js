//App project file including all screens
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
import PostCard from './modules/PostCard';
import Messaging from './screens/DirectMessage';
import Settings from './screens/Settings';
import ChatRoom from './screens/ChatRoom';
import FullProfile from './screens/FullProfile';
import UserComments from './screens/UserComments';
import Search from './screens/Search';
import SearchProfiles from './screens/SearchProfiles'
import LandingScreen from './screens/LandingScreen';
import AboutUs from './screens/AboutUs';
import Friends from './screens/Friends';
import Archives from './screens/Archives';

const Stack = createNativeStackNavigator();


const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name="LandingScreen" component={LandingScreen} />

        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        
        <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginScreen} />

        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />    

        <Stack.Screen options={{headerShown: false}} name="AddPosts" component={AddPosts} /> 

        <Stack.Screen options={{headerShown: false}}  name="Profile" component={Profile} />

        <Stack.Screen options={{headerShown: false}} name="comments"  component={Comments} />  
        
        <Stack.Screen options={{headerShown: false}} name="Messaging" component={Messaging} />  
       
        <Stack.Screen options={{headerShown: false}} name="Settings" component={Settings} />  
        
        <Stack.Screen options={{headerShown: false}} name="ChatRoom" component={ChatRoom} /> 
        
        <Stack.Screen options={{headerShown: false}} name="UserComments" component={UserComments} /> 
        
        <Stack.Screen options={{headerShown: false}} name="FullProfile" component={FullProfile} /> 
        
        <Stack.Screen options={{headerShown: false}} name="Search" component={Search} /> 

        <Stack.Screen options={{headerShown: false}} name="SearchProfiles" component={SearchProfiles} /> 
  
        <Stack.Screen options={{headerShown: false}} name="AboutUs" component={AboutUs} />

        <Stack.Screen options={{headerShown: false}} name="Friends" component={Friends} />

        <Stack.Screen options={{headerShown: false}} name="Archives" component={Archives} />  

        <Stack.Screen options={{ headerShown: false}} name="PostCard"  component={PostCard} />

        <Stack.Screen options={{headerShown: false}} name = "NavBar" component={NavBar}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
