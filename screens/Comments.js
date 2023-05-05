// Comments Page
import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { styles } from '../Style';
import ButtonNavBar from '../modules/NavBar';
import TopHeaderBar from '../modules/TopHeaderBar';
import { serverTimestamp } from 'firebase/firestore';

const Comments = ({navigation}) => {

  const [Email, setEmail] = useState ('');
  const [post, setPost] = useState(post);
  const [comment, setComment] = useState(comment);

  //save comments in the database firebase
  const savecomments = () => {
    try {
        addDoc (collection (db,`comments/${auth.currentUser?.email}/`,"comments"), {
          timestamp: serverTimestamp(),
            Email: auth.currentUser?.email,
            post: post,
            comment: comment,
         })

        alert("Success! Comment is added");
    }
    catch (e) {
      alert("Information Missing! Comment is not added");
    }
  }  

  return (
    <SafeAreaView style = {styles.page}>
      
      <SafeAreaView>

        <View>
          <TopHeaderBar navigation={navigation}/>
        </View>


      </SafeAreaView>
      
      <ScrollView>
     
      <TextInput style = {styles.post}
        onChangeText={post => setPost(post)}
        placeholder = "Enter the post title"
        multiline={true}
      />
      <TextInput style = {styles.post}
        onChangeText={comment => setComment(comment)}
        placeholder = "Enter Your Comment"
        numberOfLines={50}
        multiline={true}
      />

      
      <TouchableOpacity
        style = {styles.input}
        onPress={savecomments}
        
        onPressIn={() =>navigation.navigate('UserComments')}

      >
      <Text style={styles.create_post}>Add New Comment</Text>
      </TouchableOpacity>

      </ScrollView>
    
      <View style = {styles.nav}>
        <ButtonNavBar />
      </View>  
    
    </SafeAreaView>
  )
}

export default Comments
