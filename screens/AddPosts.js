import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import {auth, db, storage} from '../firebase';
import { getAuth,createUserWithEmailAndPassword,sendEmailVerification } from 'firebase/auth';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import {addDoc, collection} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'
import { async } from '@firebase/util';
import { ref, uploadBytes, updateMetadata, uploadBytesResumable } from 'firebase/storage';

const AddPosts = ({navigation}) => {

  const [Email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [image, setImage] = useState (null);
  const [post, setPost] = useState('');
  const [Like, setLike] = useState('');
  const [Share, setShare] = useState ('');
  const [Comment, setComment] = useState('');



  const pickImage = async () => {
    
    let set_image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!set_image.canceled) {
      setImage(set_image.assets[0].uri);
    }
  };

  const metadata = { contentType: 'image/jpg', };

  const storageRef = ref(storage, 'images');
  const upload_image = uploadBytesResumable(storageRef, image);

  
  const submitData = () => {
    upload_image.then((snapshot) => {
      console.log("Uploaded");
    });
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
  });
}

  const create_post = async() => {
    try {
      addDoc(collection(db,"posts"),{
        Email: auth.currentUser?.email,
        post: post,
        image: image,
        Username: Username,
        Like: Like, 
        Share: Share,
        Comment: Comment,
      });
      setPost('');
      setEmail('');
      setUsername('');
      setImage('');
      setLike('');
      setShare('');
      setComment('');
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style = {styles.page} >
      <ScrollView>
      <TextInput style = {styles.post}
      
        value = {post}
        onChangeText={Post => setPost(Post)}
        placeholder = "Add new Post"
        numberOfLines={50}
        multiline={true}
        
      />
    <TouchableOpacity
        style = {styles.input}
        onPress={create_post}
        onPressOut={() =>navigation.navigate('Home')}
    >
    <Text style={styles.Text}>Create New Post</Text>

    </ TouchableOpacity>

    <Button title="Pick an image from camera roll" onPress={pickImage} />
    </ScrollView>
    </View>
    
  );
  }


export default AddPosts

const styles = StyleSheet.create({

  page:  {

    flex: 1,
    backgroundColor: '#8fbc8f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  post: {
    margin: 10,
    borderWidth: 3,
    padding: 50,
    width:300,
    borderRadius:10,
    fontSize: 25,
    fontFamily: 'Noteworthy',
    borderColor: 'black',
    textAlign: 'center'
  },

  Text:{
    fontSize: 20,
    fontFamily: 'Noteworthy',
    margin: 25,
  },

})


