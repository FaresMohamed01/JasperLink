import React from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';
import {auth, db, storage} from '../firebase';
import { getAuth} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import ButtonNavBar from '../compnents/ButtonNavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';
import { uploadBytes, ref } from 'firebase/storage'; 



const AddPosts = ({navigation}) => {

  const auth = getAuth();
  const db = getFirestore();

  const [Email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [image, setImage] = useState (null);
  const [post, setPost] = useState('');
  

  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const perm_status = await ImagePicker.getCameraPermissionsAsync();
      setPermission(perm_status == true);
    }) ();
  }, []);


  const pickImage = async () => {

    const set_image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!set_image.canceled) {
      setImage(set_image.assets[0].uri);
    }

    console.log(set_image.assets[0].uri)
  };
  
  
  const pickCamera = async () => {
    
    const set_image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!set_image.canceled) {
      setImage(set_image.assets[0].uri);
    }
    console.log(set_image.assets[0].uri)
  };

  async function selectFile() {

    try {
      
        const result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
        });
      
  
        if (result.type === 'success') {
          console.log('res : ' + JSON.stringify(result));
        }
      }
     catch (err) {
      console.warn(err);
      return false;
    }
  }

  const create_post = async() => {
    
    try {
     addDoc(collection(db,`users/${auth.currentUser?.email}/`,"posts"),{
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
        onPress={pickCamera}
    >
    <Text style={styles.Text}>Upload an image using the camera</Text>

    </ TouchableOpacity>

    <TouchableOpacity
        style = {styles.input}
        onPress={pickImage}
    >
    <Text style={styles.Text}>Upload an image using the camera roll</Text>

    </ TouchableOpacity>

    <TouchableOpacity
        style = {styles.input}
        onPress={selectFile}
    >
    <Text style={styles.Text}>Upload a document</Text>

    </ TouchableOpacity>
    <TouchableOpacity
        style = {styles.input}
        onPress={create_post}
        onPressOut={() =>navigation.navigate('Home')}
    >
    <Text style={styles.Text}>Create New Post</Text>

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
