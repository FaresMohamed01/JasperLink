// Edit Profile Page
import React, { useState, useEffect }  from 'react';
import {ScrollView, Text, Button, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import {auth, db, firebase} from '../firebase';
import {collection, doc, where, query, updateDoc} from 'firebase/firestore';
import { styles } from '../Style';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({navigation}) => {

  // Needed Edit Fields for User to change their profiles
  const [Email, setEmail] = useState(null);
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Name, setName] = useState(Name);
  const [school, setSchool] = useState(school);
  const [major, setMajor] = useState(major);
  const [GPA, setGPA] = useState(GPA);
  const [information, setInformation] = useState(null);
  
  const [image, setImage] = useState(image)
  const [uploading, setUploading] = useState(false)
  const [permission, setPermission] = useState(null);

  const [users, setUsers] = useState([]);

  //creates a user in firebase
  const ProfileFirestore = async ({users}) => {
      try{
        updateDoc(doc(db,`users/${auth.currentUser?.email}`),{
          Email: auth.currentUser?.email,
          Name: Name,
          Password: Password,
          school: school,
          major:  major,
          GPA: GPA,
          information: information,
          image: image
          
        });
  
        setUsers(users)
        alert("Information added!");
      }
      catch {
        alert("Information missing!");
      }
      
  
  }

  //Functions to upload the profile picture to firebase
  useEffect(() => {
    (async () => {
      const perm_status = await ImagePicker.getCameraPermissionsAsync();
      setPermission(perm_status == true);
    }) ();
  }, []);

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
    const ref = firebase.storage().ref().child(`/images/${auth.currentUser?.email}`)
    const snapshot = ref.put(blob)

    //Checks out errors and uploading state while uploading the image
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      () => {
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
    <View style = {styles.page}>
      <View>
        <TopHeaderBar navigation={navigation}/>
      </View>
  
      <Text style = {styles.profile_edit_title}> Edit Profile </Text>
  
      <SafeAreaView style = {styles.flatlist}>
  
        <ScrollView>
  
        <View>
          <Text style = {styles.Edit_Profile_Fname_Text} >Full Name</Text>
        </View>
  
  
        <TextInput style = {styles.Edit_Profile_Fname}
          value = {Name}
          onChangeText={Name => setName(Name)}
          autoCapitalize="none"
          placeholder = "Full Name"
          autoCorrect={false}
        />
      
        <View>
          <Text style = {styles.Edit_Profile_School_Text} >School</Text>
        </View>
  
        <TextInput style = {styles.Edit_Profile_School}
          value = {school}
          onChangeText={school => setSchool(school)}
          autoCapitalize="none"
          placeholder = "School"
          autoCorrect={false}
        />
          
        <View>
          <Text style = {styles.Edit_Profile_Major_Text}>Major</Text>
        </View>
  
        <View>
          <Text style = {styles.Edit_Profile_GPA_Text} >GPA</Text>
        </View>
  
        <TextInput style = {styles.Edit_Profile_Major}
          value = {major}
          onChangeText={major => setMajor(major)}
          autoCapitalize="none"
          placeholder = "Major"
          autoCorrect={false}
        />
  
        <TextInput style = {styles.Edit_Profile_GPA}
          value = {GPA}
          onChangeText={GPA => setGPA(GPA)}
          autoCapitalize="none"
          placeholder = "GPA"
          autoCorrect={false}
        />
  
        <View>
          <Text style = {styles.Edit_Profile_Info_Text} >Additional Information</Text>
        </View>
  
        <TextInput style = {styles.Edit_Profile_Info}
          value = {information}
          onChangeText={information => setInformation(information)}
          autoCapitalize="none"
          placeholder = "Additional Research, Notes, and etc..."
          autoCorrect={false}
        />

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
        </ TouchableOpacity>

          
        <View style = {styles.Edit_Profile_Save_Button}>
          <Button 
            color = {'white'}
            title = "Save Information"
            onPress={ProfileFirestore}
              
          />
        </View>
  
        </ScrollView>
  
        <View style = {styles.navs}>
          <ButtonNavBar navigation={navigation}/>
        </View> 
  
      </SafeAreaView>  
    </View>
      
  )
}
    
  export default Profile
