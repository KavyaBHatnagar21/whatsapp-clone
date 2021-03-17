import { Avatar, IconButton } from '@material-ui/core'
import { DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import React, {useState, useEffect} from 'react';
import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';


export default function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (setRooms(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))) 

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />   
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchcontainer">
                <SearchOutlined />
                <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat addNewChat  />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    );
}
