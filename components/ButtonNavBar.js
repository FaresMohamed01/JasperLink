import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


const ButtonNavBar = ({navigation}) => {
  return (
    <View style = {styles.nav}>
      
      <TouchableOpacity onPress = {() => navigation.navigate('Home')} style = {styles.home}>
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

                   
        <TouchableOpacity onPress={() =>navigation.navigate('Profile')} style = {styles.profile}>
            <MaterialCommunityIcons
                 name={'face-man-profile'}
                 color = 'green'
                 size={40}
            />        

        </TouchableOpacity>

                    
        <TouchableOpacity onPress={() =>navigation.navigate('Home')} style = {styles.Search}>
            <MaterialCommunityIcons
                name={'account-search'}
                color = 'green'
                size={40}
            />        

        </TouchableOpacity>
               

    </View>
  )
}

export default ButtonNavBar

const styles = StyleSheet.create({

  nav:{
    backgroundColor: `#ffebcd`
  },

   profile:{

    marginTop: -2,
    marginBottom: 22,
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