import { StyleSheet, Text, View, FlatList,  Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import { query, collection, collectionGroup, where, getDocs, setDoc, addDoc, updateDoc, doc} from 'firebase/firestore';
import { auth, db} from '../firebase';
import { styles } from '../Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Friends from './Friends';


const SearchProfiles = ({route,navigation}) => {
  const { itemId } = route.params;
  const { itemEmail } = route.params;
  const { otherParam } = route.params;
  const [friends_array, setFriends_Array] = useState([]);
  const [users, setUsers] = useState([]);
  const user = query(collection(db,`users`),  where ("Email","==", itemEmail));

  const friend_query= query(collectionGroup(db,`friends`));

  async function document(){

    const get_user = await getDocs(user) 

    const users = []
   
    get_user.forEach((doc) => {

      const { Email, Password, Name, GPA, first, last, information, major, school, image } = doc.data()

      users.push ({
        id: doc.id,
        Email,
        Password,
        Name,
        GPA,
        first,
        last,
        information,
        major,
        school,
        image
      })

    })

    setUsers(get_user.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }

  async function friend_check(itemEmail){

    const get_user = await getDocs(friend_query) 

    const friends_array = []
   
    get_user.forEach((doc) => {

      const { Email, Email2 } = doc.data()

      friends_array.push ({
        id: doc.id,
        Email,
        Email2,
      })

    })

    setFriends_Array(get_user.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }

  useEffect (() => {
    document()
    friend_check(itemEmail)

  },[])

  const addfriends = () => {
    if (auth.currentUser?.email != itemEmail && itemEmail != friend_query) {
      setDoc(doc(db,`friends/${itemEmail}`),{
        Email: auth.currentUser?.email,
        Email2: itemEmail,
      });
      alert("Friend Added!");
    }
    else {
      alert("Friend Invalid!");
    }

  }


  const removefriends = () => {
    if (auth.currentUser?.email != itemEmail && itemEmail != friend_query) {
      updateDoc(doc(db,`friends/${itemEmail}`),{
        Email:"",
        Email2:" ",
      });
      alert("Friend Removed!");
    }
    else {
      alert("Friend Invalid!");
    }

  }

  return (
    <View style =  {styles.page}>

        <TopHeaderBar navigation={navigation}/>

        <SafeAreaView style = {styles.flatlist}>

       <FlatList
        data = {users}
        renderItem = {({item}) => (
            <View>
                <Image source={{uri:item.image}} style={styles.users_image} />
           
                <Text>{'\n'}{'\n'}</Text>
            
                <Text style = {styles.profile_full_name}>
                    {item.Name}
                </Text>

                <TouchableOpacity onPress={addfriends} style = {styles.friends}>
                   <MaterialCommunityIcons
                      name={'account-plus'}
                      color = "green"
                      size={60}
                    />        
                    <Text style = {styles.friend}>Add Friend </Text>   
                </TouchableOpacity>

                 <TouchableOpacity onPress={removefriends} style = {styles.follows}>
                   <MaterialCommunityIcons
                      name={'account-minus'}
                      color = "green"
                      size={60}
            
                    />        
                    <Text style = {styles.follow}>Remove Friend </Text>   
                </TouchableOpacity>

                
                <Text style = {styles.hold_profile_info}>
                  
                </Text>

                
                <Text style = {styles.personal_info_text}>Personal Info</Text>
                

                <View style = {styles.profile_border1} >
                    <Text >
                        <Text>{'\n'}</Text>
                          
                        <Text style = {styles.username_text} >   Full Name: </Text>
                        <Text style = {styles.username} >{item.Name}</Text>


                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.users_email_text}>   Email: </Text>
                        <Text style = {styles.users_email} >{item.Email}</Text> 

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.school_text} >   School: </Text> 
                        <Text style = {styles.school} >{item.school}</Text>


                    </Text>
                </View>

                <Text style = {styles.about_me_text}>About Me</Text>

                <View style = {styles.profile_border2} >
                    <Text >
                        <Text>{'\n'}</Text>

                        <Text style = {styles.major_text} >   Major: </Text>
                        <Text style = {styles.major} >{item.major}</Text>

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.gpa_text} >   GPA: </Text>
                        <Text style = {styles.gpa} >{item.GPA}</Text> 

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.extra_info_text} >   Extra Information: </Text>
                        <Text style = {styles.extra_info} >{item.information}</Text>

                    </Text>
                </View>

                

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


 

export default SearchProfiles
