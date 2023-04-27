import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Style';

const NavBar = () => {
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
  
        <TouchableOpacity onPress={() =>navigation.navigate('Search')} style = {styles.navigation}>
          <MaterialCommunityIcons
  
  name={'account-search'}
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
        
        <TouchableOpacity onPress={() =>navigation.navigate('Settings')} style = {styles.Search}>
          <MaterialCommunityIcons
  
            name={'wrench'}
            color = 'green'
            size={40}
            />        
  
        </TouchableOpacity>
    
        <TouchableOpacity onPress={() =>navigation.navigate('FullProfile')} style = {styles.profile}>
          <MaterialCommunityIcons
  
            name={'face-man-profile'}
            color = 'green'
            size={40}
            />        
  
        </TouchableOpacity>
  
  
  </View>
    );
  };

export default NavBar;
