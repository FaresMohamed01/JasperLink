// Add Posts Feature Page
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, Button, ScrollView, Text, View, TouchableOpacity,TextInput, FlatList } from 'react-native';
import {firebase} from '../firebase';
import {getAuth} from 'firebase/auth';
import {addDoc, collection, getFirestore, serverTimestamp} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';
import { styles } from '../Style';

const AddPosts = ({navigation}) => {
  const auth = getAuth();
  const db = getFirestore();

  const [image, setImage] = useState(image)
  const [uploading, setUploading] = useState(false)
  const [post, setPost] = useState(post);
  const [permission, setPermission] = useState(null);
  const [users, setUsers] = useState([]);

  //gets camera permissions
  useEffect(() => {
    (async () => {
      const perm_status = await ImagePicker.getCameraPermissionsAsync();
      setPermission(perm_status == true);
    }) ();
  }, []);

  //picks and sets an image to setImage
  const pickImage = async () => {
    const set_image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true
    });
    if (!set_image.canceled) {
      setImage(set_image.assets[0].uri);
    }
  };
  
  //picks and sets a camera imageto setImage
  const pickCamera = async () => {
    
  const set_image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!set_image.canceled) {
      setImage(set_image.assets[0].uri);
    }
  };

  //uploads image to firebase
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

 //func to save posts to firebase and send push notifications
  function create_post () {
  try {
    addDoc(collection(db,`posts/${post}/`,"posts"),{
      timestamp: serverTimestamp(),
      Email: auth.currentUser?.email,
      post: post,
      image: image,
    });
    alert("Post Saved!");
    
    setPost(null);
    setImage(null)
  }
  catch (e) {
    alert("Post Missing!");
  }
  };

  //Return all needed information and styles
  return (
    <View style = {styles.page} >
      
      <View>
        <TopHeaderBar navigation={navigation}/>
      </View>
       
      <FlatList
        style = {styles.add_post_border}
        data = {users}
        renderItem = {({item}) => (
          <View style = {styles.add_post_profile_icon_border}>
            <Text style = {styles.add_post_profile_name}>
                New Post
            </Text>
          </View>
        )}
      />  
      
      <SafeAreaView style = {styles.flatlist}> 
      <ScrollView>

      <TextInput style = {styles.post}
        value = {post}
        onChangeText={Post => setPost(Post)}
        placeholder = "What is on your mind?"
        numberOfLines={50}
        multiline={true}
      />

      <Text>{'\n'} {'\n'}</Text>

    
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

      <TouchableOpacity onPress={uploadImage}>
        <View style={styles.upload_border}>

          <Image style={styles.upload_image_icon}
           source={require('../assets/Upload.png')}>
          </Image>

          <Text style = {styles.upload_image_text}>
            Upload
            {!uploading ? <Button title='' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
          </Text>

        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.input}
        onPress={create_post}
      >
    <Text style={styles.create_post}>Create New Post</Text>


      </TouchableOpacity>

      </ScrollView>
    
   
    <View style = {styles.navs}>
      <ButtonNavBar navigation={navigation}/>
    </View>  

  </SafeAreaView>
    </View>
  );
}


export default AddPosts
