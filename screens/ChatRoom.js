import { StyleSheet } from 'react-native'
import React , {useCallback,useLayoutEffect,useEffect,useState, useRef}from 'react'
import { GiftedChat, Bubble, SystemMessage, IMessage, Send, SendProps } from 'react-native-gifted-chat'
import {collection, addDoc, orderBy, query, onSnapshot, where, getDocs, serverTimestamp} from 'firebase/firestore';
import {auth,db} from '../firebase';
import { styles } from '../Style';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const ChatRoom = ({user, route}) => {
    const [messages, setMessages] = useState([]);
    const [posts, setPosts] = useState(null)
    const [users, setUsers] = useState(null)
    const r_posts= query (collection (db, 'users'), where("Email","!=",auth.currentUser?.email));
    
    useLayoutEffect(() => {
      const collectionRef = collection(db, "chats");
      const q = query(collectionRef , orderBy("createdAt", "desc"));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log("querySnapshot unsusbscribe");
        setMessages(
          querySnapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      });
      return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user } = messages[0];
      addDoc(collection(db, "chats"), {
        _id,
        createdAt,
        text,
        user,
      });
    }, []);


    return (
    
      <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
      }}
    />
  );
};

export default ChatRoom;

