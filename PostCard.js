import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { query, collection, collectionGroup, getFirestore, addDoc, orderBy, getDocs} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import {app, db} from '../firebase';
import { Icon } from 'react-native-elements';
import AddPosts from '../screens/AddPosts';

const PostCard = ({posts}) => {

    const auth = getAuth();
    const db = getFirestore();
    const [Email, setEmail] = useState('');
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(null);

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

//Likes in a post
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

// Comments in a post



  return (


    
    <><Text>{' '}</Text><View>
          <TouchableOpacity style={styles.button} onPress={() => setLike((isLiked) => !isLiked)} onPressIn={liked_posts}>
              <Icon
                  name={"thumb-up"}
                  size={32}
                  color={like ? "green" :"#800000"} />
          </TouchableOpacity>
      </View><Text>{'\t\t\t\t'}</Text><View>
              <TouchableOpacity style={styles.button}>
                  <Icon
                      name={"comment"}
                      size={32}
                      color = {"green"}
                />
              </TouchableOpacity>
          </View><Text>{'\t\t\t\t'}</Text><View>
              <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons
                      name={"share"}
                      size={32}
                      color = {"green"}
                />
              </TouchableOpacity>
              </View></>
 )
}
    



export default PostCard

const styles = StyleSheet.create({})