import React from 'react';
import {useState, useEffect} from 'react';
import {ActivityIndicator, Image, Button, ScrollView, StyleSheet, Text, View, TouchableOpacity,TextInput, Document, FlatList } from 'react-native';
import {firebase} from '../firebase';
import { getAuth} from 'firebase/auth';
import {addDoc, collection, setDoc, getFirestore, doc, where} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import TopBanner from '../modules/TopBanner';
import TopHeaderBar from '../modules/TopHeaderBar';

import { styles } from '../Style';


const AddPosts = ({navigation}) => {

  const auth = getAuth();
  const db = getFirestore();

  const [Email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [image, setImage] = useState(null)
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

  const pickDoc = async () => {
    const set_image = await DocumentPicker.getDocumentAsync({});
    if (!set_image.canceled) {
      setImage(set_image.uri);
    }
    console.log(set_image.uri)
  }

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
    const blob = await new Promise((resolve, reject) => {
      const imagerequest = new XMLHttpRequest();
      imagerequest.onload = function() {
        resolve(imagerequest.response);
      };
      imagerequest.onerror = function() {
        reject(new TypeError('Network request failed'));
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

      
      <View>
        <TopHeaderBar navigation={navigation}/>
      </View>

      <TopBanner/>
      </SafeAreaView>
        
  
      <Image style={styles.profile_icon}
       source={require('../assets/email_image.png')}>
      </Image>

      <SafeAreaView style = {styles.flatlist}> 
      <ScrollView>
      <TextInput style = {styles.post}
      
        value = {post}
        onChangeText={Post => setPost(Post)}
        placeholder = "What is on your mind?"
        numberOfLines={50}
        multiline={true}
        
      />
 <Text>
    {'\n'} {'\n'}
    </Text>

    
    <TouchableOpacity onPress={pickCamera}>
      <View style={styles.camera_border}>
        
          <Image style={styles.camera_icon}
           source={require('../assets/camera_icon.png')}>
          </Image>
          <Text style = {styles.camera_text}>
            Camera
          </Text>

      </View>

    </TouchableOpacity>
    
   
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.camera_roll_border}>

        <Image style={styles.camera_roll_icon}
         source={require('../assets/camera_roll_icon.png')}>
        </Image>
        <Text style = {styles.camera_roll_text}>
            Camera Roll
        </Text>

      </View>
    </ TouchableOpacity>

    <TouchableOpacity onPress={pickDoc}>
      <View style={styles.camera_border}>
        
          <Image style={styles.camera_icon}
           source={require('../assets/doc.jpg')}>
          </Image>
          <Text style = {styles.camera_text}>
            Document
          </Text>

      </View>

    </TouchableOpacity>

    <TouchableOpacity onPress={uploadImage}>
      <View style={styles.camera_roll_border}>

        <Image style={styles.upload_image_icon}
         source={require('../assets/Upload.png')}>
        </Image>
        <Text style = {styles.upload_image_text}>
          Upload
        {!uploading ? <Button title='' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
        </Text>

      </View>
    </ TouchableOpacity>
  
  

       <TouchableOpacity
        style = {styles.input}
        onPress={create_post}
        onPressOut={() =>navigation.navigate('Home')}
    >
    <Text style={styles.create_post}>Create New Post</Text>


    </ TouchableOpacity>

    </ScrollView>
    
   
    <View style = {styles.navs}>

<ButtonNavBar navigation={navigation}/>

</View>  

    </SafeAreaView>
   
    </View>
    
  );
  }


export default AddPosts
