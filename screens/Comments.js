import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

const Comments = ({navigation}) => {

  const [Email, setEmail] = useState ('');
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');

  const savecomments = () => {

    try {
        addDoc (collection (db,`users/${auth.currentUser?.email}/`,"comments"), {
            Email: auth.currentUser?.email,
            post: post,
            comment: comment,
        })

    }
    catch(error){
        console.log(error)
    }


  }  
  return (
    <View style = {styles.page}>

      <TextInput style = {styles.post}
       onChangeText={post => setPost(post)}
        placeholder = "Enter the post title"
      />
       <Text>{'\n\n\n\n\n\n\n'}</Text>
      <TextInput style = {styles.post}
      onChangeText={comment => setComment(comment)}
        placeholder = "Enter Your Comment"
      />

       <TouchableOpacity
        onPress={savecomments}
        onPressOut ={() =>navigation.navigate('Home')}
    >
        <Text >Post The Comment</Text>

    </ TouchableOpacity>
    </View>
  )
}

export default Comments

const styles = StyleSheet.create({
    page:  {

        flex: 1,
        backgroundColor: '#8fbc8f',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      post: {
        margin: 5,
        borderWidth: 3,
        padding: 10,
        width:300,
        borderRadius:10,
        fontSize: 25,
        fontFamily: 'Noteworthy',
        borderColor: 'black',
        textAlign: 'center'
      },
    
      Text:{
        fontSize: 20,
        fontFamily: 'Noteworthy',
        margin: 25,
      },
})
