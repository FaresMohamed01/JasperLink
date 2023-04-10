import { StyleSheet, Text, View, FlatList,  Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { query, collection, where, getDocs} from 'firebase/firestore';
import { auth, db} from '../firebase';

const FullProfile = () => {
  const [users, setUsers] = useState([]);
  const user = query(collection(db,`users`),  where ("Email","==", auth.currentUser?.email));


  useEffect(()=> {

  async function document(){

    const get_user = await getDocs(user) 

    const users = []
    get_user.forEach((doc) => {

      const { Email, Password, Username, GPA, first, last, information, major, school } = doc.data()

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
      })

    })

    setUsers(users)
  }
   
 
  document()
  },[])

  return (
    <View style =  {styles.page}>
       <FlatList
        data = {users}
        renderItem = {({item}) => (

          <Text style = {styles.text}> 
            Email: 
            {item.Email} {'\n'}{'\n'}

            Username: 
            {item.Username} {'\n'}{'\n'}
            First Name: {item.first} {'\n'}{'\n'}
            Last Name: {item.last} {'\n'}{'\n'}
            School: {item.school} {'\n'}{'\n'}
            Major: {item.major} {'\n'}{'\n'}
            GPA: {item.GPA} {'\n'}{'\n'}
            Extra Information: {item.information} {'\n'}{'\n'}
         </Text>
        )}
      />  
    </View>
  )
}

export default FullProfile

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: '#90ee90',
        textAlign: "center"
    },

    text:{

        fontSize: 25,
        fontFamily: 'Noteworthy',
        borderColor: 'black',
        textAlign: 'flex-start'
      },
})
