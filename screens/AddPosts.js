import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {ActivityIndicator, Image, Button, ScrollView, Text, View, TouchableOpacity,TextInput, FlatList } from 'react-native';
import {firebase} from '../firebase';
import { getAuth} from 'firebase/auth';
import {addDoc, collection, collectionGroup, getFirestore, getDocs,query, where} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import TopBanner from '../modules/TopBanner';
import TopHeaderBar from '../modules/TopHeaderBar';
import { styles } from '../Style';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const AddPosts = ({navigation}) => {

  const auth = getAuth();
  const db = getFirestore();

  const user = firebase.auth().currentUser;

  const [image, setImage] = useState(image)
  const [uploading, setUploading] = useState(false)
  const [post, setPost] = useState(post);
  const [permission, setPermission] = useState(null);

  const [pushpost, setPushPost] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [users, setUsers] = useState([]);
  const user_query = query(collection(db,`users`),  where ("Email","==", auth.currentUser?.email));


  useEffect(()=> {

  async function document(){

    const get_user = await getDocs(user_query) 

    const users = []
   
    get_user.forEach((doc) => {

      const { Email, Password, Name, GPA, first, last, information, major, school, image } = doc.data()

      users.push ({
        id: doc.id,
        Email,
        Password,
        Name,
        GPA,
        first,
        last,
        information,
        major,
        school,
        image
      })

    })

    setUsers(get_user.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }
   
 
  document()
  },[])

   //Setting the notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
      }),
    });
  
 //sending notifications
  async function sendnotifications(pushpost) {
    const send_message = {
      to: pushpost,
      title: auth.currentUser?.email,
      body: 'Your Post is now live!' ,
    };
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      body: JSON.stringify(send_message),
    });
  }

 //registering push notifications
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } 
  
    return token;
  }

  //sending final notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setPushPost(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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
    console.log(set_image.assets[0].uri)
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
    addDoc(collection(db,`posts/${auth.currentUser?.email}/`,"posts"),{
      timestamp: serverTimestamp(),
      Email: auth.currentUser?.email,
      post: post,
      image: image,
    });
    sendnotifications(pushpost);
  }
  catch (e) {
    alert("Information Missing!");
  }
};


  /*
  const pickDoc = async () => {
    const set_image = await DocumentPicker.getDocumentAsync({});
    if (!set_image.canceled) {
      setImage(set_image.uri);
    }
    console.log(set_image.uri)
  }
*/



//Return all needed information and styles
  return (
    <View style = {styles.page} >
      <SafeAreaView>
      <View>
        <TopHeaderBar navigation={navigation}/>
      </View>

      <TopBanner/>
      <FlatList

        data = {users}
        renderItem = {({item}) => (
            <SafeAreaView>
                
                <Image source={{uri:item.image}} style={styles.profile_icon} />

            </SafeAreaView>
        )}

      />  
      </SafeAreaView>



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

{/*
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
*/}

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
