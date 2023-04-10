import React from 'react';
import { useState } from 'react';
import {ScrollView, StyleSheet, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';
import {auth, db} from '../firebase';
import {collection, doc, where, query, updateDoc} from 'firebase/firestore';


const Profile = ({navigation, userd}) => {

  const [Email, setEmail] = useState(null);
  const [Username, setUsername] = useState(Username);
  const [first, setFirst] = useState(first);
  const [last, setLast] = useState(last);
  const [school, setSchool] = useState(school);
  const [major, setMajor] = useState(major);
  const [GPA, setGPA] = useState(GPA);
  const [information, setInformation] = useState(null);


  const [users, setUsers] = useState([]);
  const user = query(collection(db,"users"),  where ("Email","==", auth.currentUser?.email));



    //creates a user in firebase
    const ProfileFirestore = async ({navigation,users}) => {
      try {
  
        updateDoc(doc(db,`users/${auth.currentUser?.email}`),{
          Email: auth.currentUser?.email,
          first: first,
          last: last,
          school: school,
          major:  major,
          GPA: GPA,
          information: information,
    
        });
  
        setUsers(users)
      }
      
        catch (e) {
          alert("Information Missing!");
        }
    }

    
     
      

  return (
    <View style = {styles.page}>
      <Text style = {styles.title}> Edit Profile </Text>
      <ScrollView>

       <TextInput style = {styles.textinput}
          value = {first}
          onChangeText={first => setFirst(first)}
          autoCapitalize="none"
          placeholder = "First Name"
          autoCorrect={false}
          
        />

        <TextInput style = {styles.textinput}
          value = {last}
          onChangeText={last => setLast(last)}
          autoCapitalize="none"
          placeholder = "Last Name"
          autoCorrect={false}
        />

        <TextInput style = {styles.textinput}
          value = {school}
          onChangeText={school => setSchool(school)}
          autoCapitalize="none"
          placeholder = "School"
          autoCorrect={false}
        />

        <TextInput style = {styles.textinput}
          value = {major}
          onChangeText={major => setMajor(major)}
          autoCapitalize="none"
          placeholder = "Major"
          autoCorrect={false}
        />

        <TextInput style = {styles.textinput}
          value = {GPA}
          onChangeText={GPA => setGPA(GPA)}
          autoCapitalize="none"
          placeholder = "GPA"
          autoCorrect={false}
        />

        <TextInput style = {styles.text}
          value = {information}
          onChangeText={information => setInformation(information)}
          autoCapitalize="none"
          placeholder = "Additional Research, Notes, and etc..."
          autoCorrect={false}
        />
        

        <Button
          title = "Save Information"
          onPress={ProfileFirestore}
        />
        </ScrollView>
              
    </View>
    
    
  )
}


  

  
export default Profile

const styles = StyleSheet.create({

  page:{
    flex: 1,
    backgroundColor: "#90ee90",
    justifyContent:  "center",
    textAlign: "center"

  },

  title:{

    fontSize: 25,
    fontFamily: 'Noteworthy',
    borderColor: 'black',
    textAlign: 'flex-start'
  },

  text:{

      margin: 10,
      borderWidth: 1,
      padding: 50,
      width:300,
      borderRadius:10,
      fontSize: 25,
      fontFamily: 'Noteworthy',
      borderColor: 'black',
      textAlign: 'center'
    },

    textinput:{

      margin: 10,
      borderWidth: 1,
      padding: 20,
      width:300,
      borderRadius:10,
      fontSize: 20,
      fontFamily: 'Noteworthy',
      borderColor: 'black',
      textAlign: 'center'
    },




})
