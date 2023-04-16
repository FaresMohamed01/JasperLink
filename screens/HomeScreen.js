//Home Screen Page
import React, { useState, useEffect }  from 'react';
import {Pressable, FlatList, Text, View, Image, ActivityIndicator, RefreshControl} from 'react-native';
import {db} from '../firebase';
import {collection, getDocs, where, query, collectionGroup, orderBy} from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import TopBanner from '../modules/TopBanner';
import PostCard from '../modules/Posts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Style';

const HomeScreen = ({navigation, user}) => {

  //Posts Array and Post query 
  const [posts, setPosts] = useState([]);
  const posts_query = query (collectionGroup (db, 'posts'), orderBy('timestamp','desc'));

  //Comments Array and Comment query 
  const [comment, setcomment] = useState([]);
  const comments_query = query (collectionGroup (db, 'comments'));

  //Refresh the page
  const [refresh, setRefresh] = useState(true);


  useEffect(()=> {
    fetchData()
    fetchComments()
  },[]) 

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
            Username,
          })
        })
    
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }

  const fetchComments = async () => {
    const comment = []
    const snapshot = await getDocs(comments_query) 

    comment.forEach((doc) => {
      const {Email, post, comment} = doc.data()
  
      comment.push ({
        id: doc.id,
        Email,
        post: doc(collection(db,"posts"), where ("post", "==", post)),
        comment,
     })
    })

      setcomment(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))

  }

  return (
    <View  style = {styles.page}>
       {refresh ? <ActivityIndicator/> : null}
      <SafeAreaView style = {styles.flatlist}>
      <TopBanner/>
      <FlatList 
        data = {posts}
        renderItem = {({item}) => (
          <Pressable>
            <View>
              <Text style = {styles.fontStyle}>
                <View>
                  <Image style={styles.profile_icon}
                    source={require('../assets/email_image.png')}>
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
      
            <FlatList 
              data = {comment}  
              renderItem = {({item}) => (
                 <Pressable>
                  <View>
                    <Text style = {styles.font}>
                      {'\n'}{item.Email}: {item.comment}
                    </Text>
            
                  </View>
                </Pressable>

               )}
               
             />
       
        
        {'\n'}<View>
                <Text style = {styles.abstract}>Abstract: </Text>
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


