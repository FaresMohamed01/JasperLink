//Archives Page
import React, { useState, useEffect }  from 'react';
import {Pressable, FlatList, Text, View, Image, ActivityIndicator, RefreshControl} from 'react-native';
import {db, auth} from '../firebase';
import {getDocs, where, query, collectionGroup, orderBy} from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import TopHeaderBar from '../modules/TopHeaderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Style';

const Archives = ({navigation}) => {

  //Posts Array and Post query 
  const [posts, setPosts] = useState([]);
  const posts_query = query (collectionGroup (db, 'posts'), where ("Email", "==", auth.currentUser?.email),orderBy('timestamp','desc'));

  //Refresh the page
  const [refresh, setRefresh] = useState(true);

  const fetchData = async() => {
    //function to fetch posts
      const posts = []
      const snapshot = await getDocs(posts_query) 

      setRefresh(false);
  
      posts.forEach((doc) => {
        const {Email, image, post, Username} = doc.data()
      
        posts.push ({
          id: doc.id,
          Email,
          image,
          post,
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

      <View style = {styles.profile_top_text_border}>
          <Text style = {styles.profile_top_text}>
            Saved Posts
          </Text>
      </View>

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
                <Text selectable={true} style={styles.private_email}>
                    {item.Email}
                </Text>
          
          </View> 

      <View>   
        <Text>
          {'\n\n'}<Image source={{uri:item.image}} style={styles.image} />
          {'\n\n'}
        </Text> 
      </View>  

        
      
      {'\n'}<View>
              <Text style = {styles.abstract}>Description: </Text>
                <Text selectable = {true} style = {styles.users_post}>
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

export default Archives
