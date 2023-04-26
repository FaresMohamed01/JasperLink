import { StyleSheet } from 'react-native'
import React , {useCallback,useLayoutEffect,useEffect,useState, useId}from 'react'
import { GiftedChat, Bubble, SystemMessage, IMessage, Send, SendProps } from 'react-native-gifted-chat'
import {collection, addDoc, orderBy, query, onSnapshot, where, getDocs, serverTimestamp} from 'firebase/firestore';
import {auth,db} from '../firebase';
import { styles } from '../Style';

const ChatRoom = ({user, route}) => {
    const [messages, setMessages] = useState([]);
    const [posts, setPosts] = useState(null)
    const [users, setUsers] = useState(null)
    const r_posts= query (collection (db, 'users'), where("Email","!=",auth.currentUser?.email));
    const p_posts= query (collection (db, 'chats'));

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])

    const onSend = (messageArray) => {
       const message = messageArray[0]
       
       const usermsg = {
        ...message,
        sentBy: auth.currentUser?.email,
        sentTo: r_posts,
        createdAt: new Date()
      }

      setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
      
      addDoc(collection(db,`users/${auth.currentUser?.email}/`,"chats"),{
        usermsg,
        text: messages[0].text,
        user: auth.currentUser?.email,

    })
      
    }


    return (
    
      <GiftedChat 
      style={{flex: 1}}
      messages={messages}
      onSend={messages=> onSend(messages)}
      user={{ 
        _id: auth.currentUser?.email
      }}
       />
     
     

        
    )
}

export default ChatRoom;
