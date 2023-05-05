//Direct Messaging Page
import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native'
import { db } from '../firebase'
import { getDocs, where, query, collectionGroup } from 'firebase/firestore'
import { auth } from '../firebase'
import TopHeaderBar from '../modules/TopHeaderBar'
import ButtonNavBar from '../modules/NavBar'
import { styles } from '../Style'

const DirectMessage = ({navigation}) => {
    const [posts, setPosts] = useState(null)
    const read_posts= query (collectionGroup (db, `friends`), where("Email","==",auth.currentUser?.email));
    
    const fetchData = async () => {
      
      const snapshot = await getDocs(read_posts) 
    
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
      <View style = {styles.page}>
        <View>
          <TopHeaderBar navigation={navigation}/>
        </View>

        <Text style = {styles.direct_message_title}>Inbox</Text>

        <SafeAreaView style = {styles.flatlist}>
        
        <StatusBar />
        <FlatList
            data={posts}
            keyExtractor={(item)=>item.id}
            renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', {name: item.Email})} >
              <View style={styles.card} >
                 <Image source={{uri: 'https://placeimg.com/140/140/any'}} />
                    <View style={styles.direct_message_text_border}>
                      <Text>
                        <Image style={styles.direct_message_profile_icon}
                            source={require('../assets/MC_Round_Icon.png')}>
                        </Image>
                      </Text>
                      <Text style={styles.direct_message_text} >
                          {item.Email2}
                      </Text>
                    </View>
                </View>
             </TouchableOpacity>
              )}
         />
            
          <View style = {styles.navs}>
            <ButtonNavBar navigation={navigation}/>
          </View> 

        </SafeAreaView>
         </View>  
    );
};

export default DirectMessage
