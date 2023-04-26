import { StyleSheet, Text, View, FlatList,  Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { query, collection, where, getDocs, doc} from 'firebase/firestore';
import { auth, db} from '../firebase';
import { styles } from '../Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';

const FullProfile = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const user = query(collection(db,`users`),  where ("Email","==", auth.currentUser?.email));


  useEffect(()=> {

  async function document(){

    const get_user = await getDocs(user) 

    const users = []
   
    get_user.forEach((doc) => {

      const { Email, Password, Username, GPA, first, last, information, major, school, image } = doc.data()

      users.push ({
        id: doc.id,
        Email,
        Password,
        Username,
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
                
                <Image source={{uri:item.image}} style={styles.users_image} />
           

                <Text>{'\n'}{'\n'}{'\n'}</Text>
            
           
                <Text style = {styles.profile_full_name}>
                    {item.first} {item.last}
                </Text>
           
            
                
                <Text style = {styles.hold_profile_info}>
                  
                </Text>

                
                <Text style = {styles.personal_info_text}>Personal Info</Text>
                

                <View style = {styles.profile_border1} >
                    <Text >
                        <Text>{'\n'}</Text>
                          
                        <Text style = {styles.first_name_text} >   First Name: </Text> 
                        <Text style = {styles.first_name} >{item.first}</Text>

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.last_name_text} >   Last Name: </Text>
                        <Text style = {styles.last_name} >{item.last}</Text>

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.users_email_text}>   Email: </Text>
                        <Text style = {styles.users_email} >{item.Email}</Text> 

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.username_text} >   Username: </Text>
                        <Text style = {styles.username} >{item.Username}</Text>

                        <Text>{'\n'}</Text>
                    </Text>
                </View>

                <Text style = {styles.about_me_text}>About Me</Text>

                <View style = {styles.profile_border2} >
                    <Text >
                        <Text>{'\n'}</Text>

                        <Text style = {styles.school_text} >   School: </Text> 
                        <Text style = {styles.school} >{item.school}</Text>

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.major_text} >   Major: </Text>
                        <Text style = {styles.major} >{item.major}</Text>

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.gpa_text} >   GPA: </Text>
                        <Text style = {styles.gpa} >{item.GPA}</Text> 

                        <Text>{'\n'}{'\n'}</Text>

                        <Text style = {styles.extra_info_text} >   Extra Information: </Text>
                        <Text style = {styles.extra_info} >{item.information}</Text>

                        <Text>{'\n'}</Text>
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

export default FullProfile