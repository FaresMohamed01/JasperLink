import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { query, collection, collectionGroup, getFirestore, addDoc, orderBy, getDocs} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { Icon } from 'react-native-elements';
import { Alert, Share } from 'react-native';
import { styles } from '../Style';

const PostCard = ({posts, navigation}) => {

    const auth = getAuth();
    const db = getFirestore();
    const [Email, setEmail] = useState('');
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(null);
    const [shared, setShared] = useState(null);

    const [posted, setPosted] = useState([]);
   
    const r_posts= query (collectionGroup (db, 'posts'), orderBy('timestamp','desc'));
  

  
  useEffect(()=> {
  
    async function fetchData(){
  
    const snapshot = await getDocs(r_posts) 
  
    const posted = []
  
    posted.forEach((doc) => {
      const {Email, image, post, Username} = doc.data()
      
      posted.push ({
        id: doc.id,
        Email,
        image,
        post,
        Username,
      })
    })
  
    setPosted(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }
  fetchData()
  
  },[]) 

//Likes
    const liked_posts = async({posts}) => {

        try {
            addDoc(collection(db,"reactions"), {
                Email: auth.currentUser?.email,
                like: like + 1,
            })

        }
        catch(error){
            console.log(error)

        }

    }

//Shares
const onShare = async ({posts}) => {
  try {
    const result = await Share.share({
      url: 'https://expo://192.168.1.192:19000'
        
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
}



  return (
    
    <><Text>{' '}</Text><View>
          <TouchableOpacity style={styles.thumbs_up_icon} onPress={() => setLike((isLiked) => !isLiked)} onPressIn={liked_posts}>
              <Icon
                  name={"thumb-up"}
                  size={32}
                  color={like ? "green" :"white"} />
          </TouchableOpacity>

      </View><Text>{'\t\t\t\t'}</Text><View>
              <TouchableOpacity style={styles.comment_icon} onPress={() => setComment((isLiked) => !isLiked)} onPressIn={() => navigation.navigate("comments")}>
                  <Icon
                      name={"comment"}
                      size={32}
                      color={comment ? "green" :"white"} />
              </TouchableOpacity>
              
          </View><Text>{'\t\t\t\t'}</Text><View>
              <TouchableOpacity  style={styles.comment_icon} onPress={() => setShared((isLiked) => !isLiked)}  onPressIn={onShare}>
                  <MaterialCommunityIcons
                      name={"share"}
                      size={32}
                      color = {"white"}
                />
              </TouchableOpacity>
              </View></>
 )
}
    
export default PostCard
