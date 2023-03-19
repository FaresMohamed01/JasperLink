import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {FlatList, ScrollView, StyleSheet, Text, Button, View, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import {auth, db} from '../firebase';
import { getAuth,createUserWithEmailAndPassword,sendEmailVerification, updateProfile, updateCurrentUser } from 'firebase/auth';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import {addDoc, collection, doc, getDoc, getDocFromCache, getDocs, where, query, QuerySnapshot, updateDoc} from 'firebase/firestore';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { async } from '@firebase/util';

const Profile = ({navigation}) => {

  const [Email, setEmail] = useState(null);
  const [Username, setUsername] = useState(null);
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const [GPA, setGPA] = useState(null);
  const [information, setInformation] = useState(null);


  const [users, setUsers] = useState([]);
  const user = query(collection(db,"users"),  where ("Email","==", auth.currentUser?.email));

useEffect(async()=> {

    
    const get_user = await getDocs(user) 

    const users = []

    get_user.forEach((doc) => {

      const { Email, Password, Username } = doc.data()

      users.push ({
        id: doc.id,
        Email,
        Password,
        Username,
      })

    })

    setUsers(users)

  },[])

    //creates a user in firebase
    const ProfileFirestore = async ({navigation}) => {
      try {
  
        addDoc(collection(db,"users"),{
          
          Email: auth.currentUser?.email,
          Username: Username,
          first: first,
          last: last,
          school: school,
          major:  major,
          GPA: GPA,
          information: information,
    
        });
  
        setEmail('');
        setUsername('');
        setFirst('');
        setLast('');
        setSchool('');
        setMajor('');
        setGPA('');
        setInformation('');
  
    
      }
      
        catch (e) {
          console.error("Error adding document: ", e);
        }
     
      }

  return (
    <View>

      <Text>{auth.currentUser?.email}</Text>    

      <FlatList
        data = {users}
        renderItem = {({item}) => (

          <Pressable
          >
            <View>

              <Text>{item.Username}</Text>

              
            </View>
           
          </Pressable>

        )}
      />  

        <TextInput
          value = {first}
          onChangeText={first => setFirst("Text")}
          autoCapitalize="none"
          placeholder = "First Name"
          autoCorrect={false}
          
        />

        <TextInput
          value = {last}
          onChangeText={last => setLast(last)}
          autoCapitalize="none"
          placeholder = "Last Name"
          autoCorrect={false}
        />

        <TextInput
          value = {school}
          onChangeText={school => setSchool(school)}
          autoCapitalize="none"
          placeholder = "School"
          autoCorrect={false}
        />

        <TextInput
          value = {major}
          onChangeText={major => setMajor(major)}
          autoCapitalize="none"
          placeholder = "Major"
          autoCorrect={false}
        />

        <TextInput
          value = {GPA}
          onChangeText={GPA => setGPA(GPA)}
          autoCapitalize="none"
          placeholder = "GPA"
          autoCorrect={false}
        />

        <TextInput
          value = {information}
          onChangeText={information => setInformation(information)}
          autoCapitalize="none"
          placeholder = "Additional Research, Notes, and etc..."
          autoCorrect={false}
        />


        <TextInput
          value = {Username}
          onChangeText={Username=> setUsername(Username)}
          autoCapitalize="none"
          placeholder = "Create Your Username"
          autoCorrect={false}
        />


        <Button

          title = "Save Information"
          onPress={ProfileFirestore}
          
          
          
        />
    </View>
  )
}

  

  
export default Profile

const styles = StyleSheet.create({})
