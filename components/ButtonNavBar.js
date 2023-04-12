import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = () => {
    const navigation = useNavigation();
    return (
      <View style = {styles.nav}>
  
  
        <TouchableOpacity onPress={() =>navigation.navigate('Home')} style = {styles.home}>
          <MaterialCommunityIcons
  
            name={'home'}
            color = 'green'
            size={40}
            />        
  
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() =>navigation.navigate('Home')} style = {styles.navigation}>
          <MaterialCommunityIcons
  
            name={'bell-circle'}
            color = 'green'
            size={40}
            />        
  
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() =>navigation.navigate('AddPosts')} style = {styles.Post}>
          <MaterialCommunityIcons
  
            name={'post-outline'}
            color = 'green'
            size={40}
            />        
  
        </TouchableOpacity>
  
        
        <TouchableOpacity onPress={() =>navigation.navigate('FullProfile')} style = {styles.profile}>
          <MaterialCommunityIcons
  
            name={'face-man-profile'}
            color = 'green'
            size={43}
            />        
  
        </TouchableOpacity>
  
        
        <TouchableOpacity onPress={() =>navigation.navigate('Home')} style = {styles.Search}>
          <MaterialCommunityIcons
  
            name={'account-search'}
            color = 'green'
            size={45}
            />        
  
        </TouchableOpacity>
    
  
  
  
  </View>
    );
  };

  const styles = StyleSheet.create({

    nav:{
      backgroundColor: `#ffebcd`
    },
  
     profile:{
  
      marginTop: -2,
      marginBottom: 17,
      marginLeft: 340,
      marginRight: 10
    
    },
  
    home:{
  
      marginRight: 340,
      marginBottom: -39,
      marginLeft: 13,
    },
  
    Search:{
  
      marginRight: 26,
      marginBottom: 30,
      marginLeft: 270,
      marginTop: -60
  
    },
  
  
  
    navigation:{
  
      marginRight: 20,
      marginBottom: -39,
      marginLeft: 90,
   
  
  
    },
  
    Post :{
  
      marginRight: 20,
      marginBottom: -39,
      marginLeft: 180,
  
    },
  
  })
export default Navbar;
