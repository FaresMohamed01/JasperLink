//Home Screen Page
import React, { useState, useEffect }  from 'react';
import {Pressable, FlatList, Text, View, Image, ActivityIndicator, RefreshControl} from 'react-native';
import {db} from '../firebase';
import {getDocs, query, collectionGroup, orderBy} from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import TopBanner from '../modules/TopBanner';
import PostCard from '../modules/PostCard';
import TopHeaderBar from '../modules/TopHeaderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Style';


const HomeScreen = ({navigation}) => {
  //Posts Array and Post query 
  const [posts, setPosts] = useState([]);
  const posts_query = query (collectionGroup (db, 'posts'), orderBy("timestamp", "desc"));

  //Refresh the page
  const [refresh, setRefresh] = useState(true);

  const fetchData = async() => {
    //function to fetch posts
      const posts = []
      const snapshot = await getDocs(posts_query) 

      setRefresh(false);
  
      posts.forEach((doc) => {
        const {Email, image, post,users} = doc.data()
      
        posts.push ({
          id: doc.id,
          Email,
          image,
          post,
          users,
        })
      })
  
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
}

  useEffect(()=> {
    fetchData()
  },[]) 


  return (
    <View  style = {styles.page}>
      <View>
        <TopHeaderBar navigation={navigation}/>
      </View>

      <TopBanner/>

      <Text style = {styles.home_text}>
        Home
      </Text>

       {refresh ? <ActivityIndicator/> : null}

      <SafeAreaView style = {styles.flatlist}>
      <FlatList 
        data = {posts}
        renderItem = {({item}) => (
          <Pressable>
            <View>
              <Text style = {styles.fontStyle}>
                <View>
                  <Image style={styles.profile_icon}
                    source={require('../assets/MC_Round_Icon.png')}>
                  </Image>
                  
                  <Text style={styles.private_email}>
                      {item.Email}
                  </Text>
            
                </View> 

      {'\n\n'}{item.image && <Image source={{uri:item.image}} style={styles.image} />}
      
            <View>
              <Text style = {styles.like_text}>Like</Text>
              <Text style = {styles.comment_text}>Comment</Text>
              <Text style = {styles.share_text}>Share</Text>
            </View>

            <PostCard navigation={navigation} />

          
        
        {'\n'}<View>
                <Text style = {styles.abstract}>Description: </Text>
                  <Text style = {styles.users_post}>
                    {item.post}
                  </Text>
              </View>
        
            </Text>
          </View>
 
        </Pressable>
     )}  
     refreshControl={
     <RefreshControl refreshing={refresh} onRefresh={fetchData} />
     }
    />

      <View style = {styles.nav}>
        <ButtonNavBar navigation={navigation}/>
      </View>  
      </SafeAreaView>   
    </View>  
  );

};

export default HomeScreen;
