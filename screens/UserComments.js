//Comments page for users
import React, { useState, useEffect }  from 'react';
import {Pressable, FlatList, Text, View, Image, ActivityIndicator, RefreshControl} from 'react-native';
import {db} from '../firebase';
import {getDocs, query, collectionGroup} from 'firebase/firestore';
import ButtonNavBar from '../modules/NavBar';
import TopHeaderBar from '../modules/TopHeaderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Style';

const UserComments = ({navigation}) => {
    //Comments Array and Comments query 
    const [comment, setComment] = useState([]);
    const comments_query = query (collectionGroup (db, 'comments'));
  
    //Refresh the page
    const [refresh, setRefresh] = useState(true);

    //function to fetch comments
    const fetchData = async() => {
          const comment = []
          const snapshot = await getDocs(comments_query) 
  
          setRefresh(false);
      
          comment.forEach((doc) => {
            const {Email, image, post, Username} = doc.data()
          
            comment.push ({
              id: doc.id,
              Email,
              image,
              post,
              Username,
            })
          })
      
          setComment(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
    }

    useEffect(()=> {
      fetchData()
    },[]) 
  
    return (
      <View  style = {styles.page}>
        <View>
          <TopHeaderBar navigation={navigation}/>
        </View>

        {refresh ? <ActivityIndicator/> : null}
  
        <SafeAreaView style = {styles.flatlist}>
        <FlatList 
          data = {comment}
          renderItem = {({item}) => (
            <Pressable>
              <View style = {styles.User_Comments_border}>
                <Text>
                  <View>
                  <Image style={styles.profile_icon}
                    source={require('../assets/MC_Round_Icon.png')}>
                  </Image>
                    
                    <Text selectable={true} style={styles.User_Comments_private_email}>
                        {item.Email}
                    </Text>
              
              </View> 
  
            
              {'\n'}{'\n'}<View >
                  <Text style = {styles.User_Comments_abstract}>Description: </Text>
                    <Text selectable={true} style = {styles.User_Comments_users_post}>
                      {item.post}
                    </Text>
                </View>

          {'\n'}{'\n'}<View>
                  <Text style = {styles.User_Comments_abstract}>Comments: </Text>
                    <Text selectable={true} style = {styles.User_Comments_users_post}>
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
