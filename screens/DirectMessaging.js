import { ScrollView, StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDoc, getDocs, where, query, collectionGroup, orderBy } from 'firebase/firestore'
import { auth } from '../firebase'
import { async } from '@firebase/util'
import Navbar from '../modules/NavBar'
import { styles } from './Style'



const DirectMessage = ({user, navigation}) => {
    const [posts, setPosts] = useState(null)
    const r_posts= query (collection (db, 'users'), where("Email","!=",auth.currentUser?.email));

    useEffect(()=> {

        async function  fetchData(){
      
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
fetchData()
},[])

  

      return (
        <View style = {styles.page}>
        <SafeAreaView >
           
          <StatusBar />
            <View>
                <FlatList
                    data={posts}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                        onPress={() => navigation.navigate('ChatRoom', {name: item.Email})}
                        >
                        <View style={styles.create_post} >
                            <View>
                            <Text style={styles.post} >{item.Email}</Text>
                           </View>
                        </View>
                        </TouchableOpacity>
                    )}
                    />
            </View>
          <Text>  {'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}</Text>
        </SafeAreaView>

        <View style = {styles.nav}>

<Navbar navigation={navigation}/>

</View>  
         
         </View>
      );
    };

export default DirectMessage

