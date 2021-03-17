import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

export default function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, ] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId)
            .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
        
            db.collection("rooms")
            .doc(roomId).collection("messages").orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {    
        e.preventDefault();
        console.log("You typed ...", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
        console.log(user.displayName);
    }

    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar
                src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg?mouth[]=twinkle`}
            />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {
                            new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
            {messages.map((message) => (
               
                <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>  
              
            ))
            }
            </div>    
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="type a message"
                    type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
           
            
        </div>
    )
}
