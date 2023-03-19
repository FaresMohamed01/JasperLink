import React from 'react';
import { useState, useEffect } from 'react';
import {Pressable, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import {auth,  db} from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query } from "firebase/firestore";
import {Icon} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';

const HomeScreen = ({navigation}) => {
  
  const [posts, setPosts] = useState([]);
  const refresh = () => window.location.reload()
  const r_posts= query(collection(db,"posts"));

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [liked, setLiked] = useState(false);

  const [commented, setCommented] = useState(false);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  

  const comments = () => {


    <TextInput 
      placeholder='Enter a comment'

    ></TextInput>

  }
  const [shared, setShared] = useState(false);
 

  useEffect(async()=> {

    const get_posts = await getDocs(r_posts) 

    const posts = []

    get_posts.forEach((doc) => {

      const {Email, image, post, Username, Share, Like, Comment} = doc.data()
      
      posts.push ({
        id: doc.id,
        Email,
        image,
        post,
        Username,
        Share,
        Like,
        Comment,
      })
    })
    setPosts(posts)
  },[])       
   
    
    const SignOut = () =>  {

        signOut(auth)
        .then(() => {
            navigation.navigate("Login")
        })
    
        .catch(error => alert(error.message))
    }


    return (
        
        <View  style  =  {styles.page}>
            
            <TouchableOpacity
                style = {styles.input}
                onPress={() =>navigation.navigate('AddPosts')}
            >
            <Text style={styles.Text}>Add Posts</Text>
            </ TouchableOpacity>

            <TouchableOpacity>
              <Icon
                style = {styles.input}
                onPress={() =>navigation.navigate('Profile')}
            />
            <Text style={styles.Text}>Profile</Text>
            </ TouchableOpacity>

            <TouchableOpacity>
              <Icon
                style = {styles.input}
                onPress={() =>navigation.navigate('camera')}
            />
            <Text style={styles.Text}>Profile</Text>
            </ TouchableOpacity>

            <TouchableOpacity
                style = {styles.input}
                onPress={SignOut}
            >
            <Text style={styles.Text}>SignOut</Text>
            </ TouchableOpacity>

        

            <FlatList 
              data = {posts}
              renderItem = {({item}) => (

              <Pressable>
                <View>

                  <Text style = {styles.fontStyle}>
                    {item.Email}
                    {'\n'}
                    {item.post}
                    {'\n'}
                    {item.Like}
                    {'\n'}

              
                    {item.image && <Image source={{ uri: item.image }} style={{ width: 300, height: 900, textAlign: 'center' }} />}
                    {'\n'}
                    {'\n'}
                    
         

                    
                  
                    <Pressable>
                      <MaterialCommunityIcons

                        name={liked ? "heart" : "heart-outline"}
                        size={32}
                        color={liked ? "blue" : "black"}
                       />        
                    </Pressable>
                    
                  
                    

                    <Text>{'\t'}</Text>

                    <Pressable style={styles.button}>
                      <MaterialCommunityIcons
                        name={"comment-text"}
                        size={32}
                       /> 

                           
                    </Pressable>

                    <Text>{'\t'}</Text>

                    <Pressable style={styles.button}>
                      <MaterialCommunityIcons
                        name={"share"}
                        size={32}
                       /> 

                           
                    </Pressable>
 
                 </Text>

                  
                </View>
               
              </Pressable>
              
                 )}            
             />  
        </View>
    );
};


const styles = StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: '#8fbc8f',
        alignItems: 'center',
        justifyContent: 'center',
    
      },
    fontStyle: {
        borderWidth: 4,
        margin: 20,
        fontSize: 12,
        fontFamily: 'Noteworthy',
        borderColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

      },
      comment: {
        borderWidth: 1,
        margin: 20,
        fontSize: 12,
        fontFamily: 'Noteworthy',
        borderColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

      },

      posts:{

        borderWidth: 1,

      },

      button:{

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',



      },

    
  });

export  default HomeScreen;
