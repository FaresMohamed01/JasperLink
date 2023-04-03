import React from 'react';
import {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';
import {auth, db, storage} from '../firebase';
import { getAuth} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import ButtonNavBar from '../compnents/ButtonNavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';


const AddPosts = ({navigation}) => {

  const [Email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [image, setImage] = useState (null);
  const [post, setPost] = useState('');
  const [liked, setLike] = useState([]);
  const [Share, setShare] = useState ('');
  const [comment, setComment] = useState([]);

  const auth = getAuth();
  const db = getFirestore();



  const pickImage = async () => {

    let permission = ImagePicker.getCameraPermissionsAsync()
  
    let set_image = await ImagePicker.launchIm({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!set_image.canceled) {
      setImage(set_image.assets[0].uri);
    }
  };
  
  
  const pickCamera = async () => {
    
    let set_image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    }).then((image) => {
      setImage(image.assets[0].uri)
    });
  };



  const create_post = async() => {
    try {
     addDoc(collection(db,"posts"),{
        timestamp: serverTimestamp(),
        Email: auth.currentUser?.email,
        post: post,
        image: image,
        Username: Username,
      });
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  

  return (
    <View style = {styles.page} >
      <SafeAreaView>
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

    <TouchableOpacity
        style = {styles.input}
        onPress={pickCamera}
    >
    <Text style={styles.Text}>Upload an image using the camera</Text>

    </ TouchableOpacity>
    </ScrollView>
    
    <ButtonNavBar navigation={navigation}/>
    </SafeAreaView>
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

