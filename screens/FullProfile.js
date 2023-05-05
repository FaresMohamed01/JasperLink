// Users Profile Page
import React, { useState, useEffect } from 'react'
import { Text, View, FlatList,  Image } from 'react-native'
import { query, collection, where, getDocs} from 'firebase/firestore';
import { auth, db} from '../firebase';
import { styles } from '../Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopHeaderBar from '../modules/TopHeaderBar';
import ButtonNavBar from '../modules/NavBar';

const FullProfile = ({navigation}) => {
  const [profiles, setProfiles] = useState([]);
  const profile = query(collection(db,`users`),  where ("Email","==", auth.currentUser?.email));

  //Read appropriate Profile Data
  const profile_data = async() => {

    const get_profiles = await getDocs(profile) 

    const profiles = []
   
    get_profiles.forEach((doc) => {
      const { Email, Password, Name, GPA, first, last, information, major, school, image } = doc.data()

      profiles.push ({
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
    setProfiles(get_profiles.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
  }
   
  useEffect(()=> {
    profile_data()
  },[])

  return (
    <View style =  {styles.page}>
        <TopHeaderBar navigation={navigation}/>

        <View style = {styles.profile_top_text_border}>
          <Text style = {styles.profile_top_text}>
            Profile
          </Text>
        </View>

        <SafeAreaView style = {styles.flatlist}>
          <FlatList
            data = {profiles}
            renderItem = {({item}) => (
            <View>
              <Image source={{uri:item.image}} style={styles.users_image} />
              <Text>{'\n'}{'\n'}{'\n'}</Text>
              <Text style = {styles.profile_full_name}>
                  {item.Name}
              </Text>
                
              <Text style = {styles.hold_profile_info}>
                  
              </Text>

                
              <Text style = {styles.personal_info_text}>Personal Info</Text>
              
              <View style = {styles.profile_border1} >
                <Text>
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

export default FullProfile
