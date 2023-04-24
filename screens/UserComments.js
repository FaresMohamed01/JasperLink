import React, { useState, useEffect }  from 'react';
import {Pressable, FlatList, Text, Video, View, Image, ActivityIndicator, RefreshControl} from 'react-native';
import {db, auth} from '../firebase';
import {collection, getDocs, where, query, collectionGroup, orderBy} from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import TopBanner from '../modules/TopBanner';
import PostCard from '../modules/PostCard';
import TopHeaderBar from '../modules/TopHeaderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Style';

const UserComments = ({navigation}) => {
    //Posts Array and Post query 
    const [posts, setPosts] = useState([]);
    const posts_query = query (collectionGroup (db, 'comments'));
  
    //Refresh the page
    const [refresh, setRefresh] = useState(true);
  
    useEffect(()=> {
      fetchData()
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
  
  
    return (
      <View  style = {styles.page}>
        <View>
          <TopHeaderBar navigation={navigation}/>
        </View>
  
        <TopBanner/>
  
         {refresh ? <ActivityIndicator/> : null}
  
        <SafeAreaView style = {styles.flatlist}>
        <FlatList 
          data = {posts}
          renderItem = {({item}) => (
            <Pressable>
              <View>
                <Text>
                  <View>
                    <Image style={styles.profile_icon}
                      source={require('../assets/email_image.png')}>
                    </Image>
                    
                    <Text selectable={true} style={styles.private_email}>
                        {item.Email}
                    </Text>
              
              </View> 
  
            
              {'\n'}{'\n'}<View>
                  <Text style = {styles.abstract}>Abstract: </Text>
                    <Text selectable={true} style = {styles.users_post}>
                      {item.post}
                    </Text>
                </View>

          {'\n'}{'\n'}<View>
                  <Text style = {styles.abstract}>Comments: </Text>
                    <Text selectable={true} style = {styles.users_post}>
                      {item.comment}
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


export default UserComments
