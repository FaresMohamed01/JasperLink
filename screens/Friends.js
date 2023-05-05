//Friends Page
import React, { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import { query, collectionGroup, where, getDocs} from 'firebase/firestore';
import { auth, db} from '../firebase';
import { styles } from '../Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';

const Friends = ({navigation}) => {
  const [friend, setFriend] = useState([]);
  const friends = query (collectionGroup (db, 'friends'),where ("Email", "==", auth.currentUser?.email));

  // Read appropriate friends collection into an array
  const friend_doc = async () => {

    const get_friend= await getDocs(friends) 

    const friend = []
   
    get_friend.forEach((doc) => {

      const { Email, Email2 } = doc.data()
      friend.push ({
        id: doc.id,
        Email,
        Email2,
      })

    })

    setFriend(get_friend.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }
  //Call the function document
  useEffect(()=> {
    friend_doc()
  },[])
  //return appropriate stylings and information
  return (
    <View style =  {styles.page}>
      <TopHeaderBar navigation={navigation}/>
          <View style = {styles.profile_top_text_border}>
            <Text style = {styles.profile_top_text}>
              Friend List
            </Text>
          </View>
  
        <SafeAreaView style = {styles.flatlist}>
  
          <FlatList
            data = {friend}
            renderItem = {({item}) => (
            <View>
             <Text style={styles.create_post}>{item.Email2}</Text>
            </View>
            )}
          />  
  
        <View style = {styles.navs}>
          <ButtonNavBar navigation={navigation}/>
        </View> 
      
        </SafeAreaView>
      </View>
      
    )
}

export default Friends
