import { StyleSheet } from 'react-native'
import React , {useCallback,useLayoutEffect,useEffect,useState}from 'react'
import { GiftedChat, Bubble, SystemMessage, IMessage, Send, SendProps } from 'react-native-gifted-chat'
import {collection, addDoc, orderBy, query, onSnapshot, where, getDocs} from 'firebase/firestore';
import {auth,db} from '../firebase';

export default function ChatRoom ({navigation}) {
    const [messages, setMessages] = useState([]);
    const [posts, setPosts] = useState(null)
    const [users, setUsers] = useState(null)
    const r_posts= query (collection (db, 'users'), where("Email","!=",auth.currentUser?.email));
    const p_posts= query (collection (db, 'chats'));

    useEffect(()=> {

        async function  fetchData(){
      
        const snapshot = await getDocs(r_posts) 
      
        const posts = []
      
        posts.forEach((doc) => {
          const {Email, image, docu, post, Username} = doc.data()
          
          posts.push ({
            id: doc.id,
            Email,
            image,
            docu,
            post,
            Username,
          })
        })
      
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
      }
fetchData()
    },[])

    useLayoutEffect(() => {
        const query_collection = collection(db, 'chats');

        const q = query(query_collection, orderBy('createdAt','desc'));

        const unsubscribe = onSnapshot (q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user:doc.data().user,
                    sent_to: doc.data().sent_to

                }))
            );
        })
        return () => unsubscribe();
    },[navigation]);

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

      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => 
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user, sent_to} = messages[0];    

        addDoc(collection(db,`users/${auth.currentUser?.email}/`,"chats"),{
            _id,
            createdAt,
            text: messages[0].text,
            user: auth.currentUser?.email,
            sent_to: posts

        })
    },[]);


   
    return (
    
        <GiftedChat

            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            alwaysShowSend
            showUserAvatar
            user={{
                _id: 1,
            }}
        
        
        />
        

        
    )
}

const styles = StyleSheet.create({})
