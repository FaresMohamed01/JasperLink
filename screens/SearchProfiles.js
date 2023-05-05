//Other users profiles
import React, { useState, useEffect } from 'react'
import { Text, View, FlatList,  Image, TouchableOpacity } from 'react-native'
import { query, collection, collectionGroup, where, getDocs, setDoc, updateDoc, doc} from 'firebase/firestore';
import { auth, db} from '../firebase';
import { styles } from '../Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const SearchProfiles = ({route,navigation}) => {

  //Needed Fields 
  const { itemId } = route.params;
  const { itemEmail } = route.params;
  const { otherParam } = route.params;
  const [friends_array, setFriends_Array] = useState([]);
  const [users, setUsers] = useState([]);

  const user = query(collection(db,`users`),  where ("Email","==", itemEmail));

  const friend_query= query(collectionGroup(db,`friends`));

  const document = async() => {

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

        <Text style = {styles.profile_edit_title}> View Profile </Text>

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

                <TouchableOpacity onPress={addfriends} style = {styles.add_friend_image}>
                   <MaterialCommunityIcons
                      name={'account-plus'}
                      color = "green"
                      size={60}
                    />        
                    <Text style = {styles.add_friend_text}>Add Friend </Text>   
                </TouchableOpacity>

                 <TouchableOpacity onPress={removefriends} style = {styles.remove_friend_image}>
                   <MaterialCommunityIcons
                      name={'account-minus'}
                      color = "green"
                      size={60}
            
                    />        
                    <Text style = {styles.remove_friend_text}>Remove Friend </Text>   
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
