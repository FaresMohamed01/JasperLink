import React from 'react';
import { useState, useEffect } from 'react';
import {Pressable, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, RefreshControl, ActivityIndicator, Button, ScrollView} from 'react-native';
import {auth,  db, app} from '../firebase';
import { signOut } from 'firebase/auth';
import {Icon} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import NavBar from './navbar';
import {addDoc, collection, doc, getDoc, getDocFromCache, getDocs, where, query, QuerySnapshot, updateDoc, setDoc, documentId, collectionGroup, DocumentReference, DocumentSnapshot, orderBy, arrayUnion, arrayRemove} from 'firebase/firestore';
import { ref } from 'firebase/storage';
import ButtonNavBar from '../compnents/ButtonNavBar';
import PostCard from '../compnents/PostCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  
  const [posts, setPosts] = useState([]);
  const refresh = () => window.location.reload()
  const r_posts= query (collectionGroup (db, 'posts'), orderBy('timestamp','desc'));

  const [liked, setliked] = useState(false)
  const [comment, setcomment] = useState([])
  const [share, setshare] = useState([])

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);




useEffect(()=> {

  async function  fetchData(){

  const snapshot = await getDocs(r_posts) 

  const posts = []

  posts.forEach((doc) => {
    const {Email, image, post, Username} = doc.data()
    
    posts.push ({
      id: doc.id,
      Email,
      image,
      post,
      Username,
    })
  })

  setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
}
fetchData()

},[]) 

  //save likes in database

  //save comments in database

  //show comments in drop menu

  //save shares in database

   

    
  const SignOut = () =>  {

        signOut(auth)
        .then(() => {
            navigation.navigate("Login")
        })
    
        .catch(error => alert(error.message))
  }


  return (
        
        <View  style  =  {styles.page}>
          <SafeAreaView>

        
          <TouchableOpacity
                 onPress={() =>navigation.navigate('Login')}
             >
             <Text>Sign Out</Text>
 
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

      {item.image && <Image source={{uri:item.image}} style={{ width: 300, height: 900, textAlign: 'center' }} />}
      {'\n\n\n\n\n\n\n'}

 
            <PostCard navigation={navigation}/>

            {'\n'}   
      </Text>

    
  </View>
 
</Pressable>

   )} 
/>  



            <View style = {styles.nav}>

            <ButtonNavBar navigation={navigation}/>


           
           
            </View>  
                       
            </SafeAreaView>  
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
        marginBottom: 35,
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

      nav:{
        backgroundColor: `#ffebcd`
      }


    
});

export  default HomeScreen;




