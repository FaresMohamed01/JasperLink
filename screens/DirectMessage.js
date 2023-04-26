import { ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDoc, getDocs, where, query, collectionGroup, orderBy } from 'firebase/firestore'
import { auth } from '../firebase'
import { async } from '@firebase/util'
import ButtonNavBar from '../modules/NavBar'
import { styles } from '../Style'



const DirectMessage = ({user, navigation}) => {
    const [posts, setPosts] = useState(null)
    const r_posts= query (collection (db, 'users'), where("Email","!=",auth.currentUser?.email));

    const fetchData = async () => {
      
      const snapshot = await getDocs(r_posts) 
    
      const posts = []
    
      posts.forEach((doc) => {
        const {Email, image, docu, post, Username} = doc.data()
        
        posts.push ({
          id: doc.id,
          Email,
          image,
          docu,
          post,
          Username,
        })
      })
    
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
    }

    
    useEffect(()=> {
      fetchData()
    },[])

  

      return (
        <View>
           
        <SafeAreaView >
           
          <StatusBar />
            <View>
                <FlatList
                    data={posts}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', {name: item.Email})} >
                      <View style={styles.card} >
                          <Image source={{uri: 'https://placeimg.com/140/140/any'}} />
                        <View style={styles.textArea}>
                      <Text style={styles.nameText} >{item.Email}</Text>
                      </View>
                      </View>
                      </TouchableOpacity>
                    )}
                    />
            </View>
            <View style = {styles.nav}>
        <ButtonNavBar navigation={navigation}/>
      </View>  
        </SafeAreaView>

         
         </View>
         
      );
    };

export default DirectMessage

