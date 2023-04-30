import { StyleSheet, Text, View, FlatList,  Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { query, collectionGroup, where, getDocs, doc, collection} from 'firebase/firestore';
import { auth, db} from '../firebase';
import { styles } from '../Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';

const Friends = ({route,navigation}) => {
    const [users, setUsers] = useState([]);
    const user = query (collectionGroup (db, 'friends'),where ("Email", "==", auth.currentUser?.email));

  
  
    useEffect(()=> {
  
    async function document(){
  
      const get_user = await getDocs(user) 
  
      const users = []
     
      get_user.forEach((doc) => {
  
        const { Email, Email2 } = doc.data()
  
        users.push ({
          id: doc.id,
          Email,
          Email2,
        })
  
      })
  
      setUsers(get_user.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
    }
     
   
    document()
    },[])
  
    return (
      <View style =  {styles.page}>
  
          <TopHeaderBar navigation={navigation}/>
  
          <SafeAreaView style = {styles.flatlist}>
  
         <FlatList
  
          data = {users}
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
