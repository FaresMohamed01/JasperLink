import React from 'react';
import {useState, useEffect} from 'react';
import {ActivityIndicator, Image, Button, ScrollView, StyleSheet, Text, View, TouchableOpacity,TextInput, Document } from 'react-native';
import {firebase} from '../firebase';
import { getAuth} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const AddPosts = ({navigation}) => {

  const auth = getAuth();
  const db = getFirestore();

  const [Email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [image, setImage] = useState(null)
  const [doc, setDoc] = useState([])
  const [uploading, setUploading] = useState(false)
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
      quality: 1,
      allowsMultipleSelection: true
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

  const create_post = async() => {
    
    try {
     addDoc(collection(db,`posts/${auth.currentUser?.email}/`,"posts"),{
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

  const uploadImage = async () => {

    // Make a HTTP request to the file 
    const blob = await new Promise((resolve) => {
      const imagerequest = new XMLHttpRequest();
      imagerequest.onload = function() {
        resolve(imagerequest.response);
      };

      imagerequest.responseType = 'blob';
      imagerequest.open('GET', image, true);
      imagerequest.send(null);
    })

    // create firebase storage called 'Posts' and adds file to it
    const ref = firebase.storage().ref().child(`/images/${post}`)
    const snapshot = ref.put(blob)

    //Checks out errors and uploading state while uploading the image
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          setImage(url)
          blob.close()
          return url
        })
      }
      )
  }


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
    <Text style={styles.Text}>Select an image using the camera</Text>

    </ TouchableOpacity>

    <TouchableOpacity
        style = {styles.input}
        onPress={pickImage}
    >
    <Text style={styles.Text}>Select an image using the camera roll</Text>

    </ TouchableOpacity>
    
     <TouchableOpacity onPress={uploadImage}>
      <View style={styles.upload_border}>

        <Image style={styles.camera_roll_icon}
         source={require('../assets/Upload.png')}>
        </Image>
        <Text style = {styles.update_roll_text}>
          Upload Image
        {!uploading ? <Button title='' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
        </Text>

      </View>
    </ TouchableOpacity>


    <TouchableOpacity
        style = {styles.input}
        onPressIn={uploadImage}
        onPress = {create_post}
        onPressOut={() =>navigation.navigate('Home')}
    >
    <Text style={styles.Text}>Create New Post</Text>

    </ TouchableOpacity>
    </ScrollView>
    
   
    </SafeAreaView>
    <ButtonNavBar navigation={navigation}/>
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
