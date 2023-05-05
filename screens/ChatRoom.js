//ChatRoom Page
import React , {useCallback,useLayoutEffect,useState} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {collection, addDoc, orderBy, query, onSnapshot, where} from 'firebase/firestore';
import {auth,db} from '../firebase';

const ChatRoom = () => {
    //Array to save messages
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
      const chatting = query(collection(db, "chats") , orderBy("createdAt", "desc"));
  
      const unsubscribe = onSnapshot(chatting, (querySnapshot) => {
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

    //Save messages to the database (chats) in firebase
    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
       );
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
          onSend={(messages) => onSend(messages)}

          user={{
            _id: auth.currentUser?.email,
          }}

        />
    );
};

export default ChatRoom;
