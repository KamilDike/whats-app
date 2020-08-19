import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from '../Firebase'
import { Link, useParams } from 'react-router-dom'

function SidebarChat( {addNewChat, name, id} ) {

    const [userId, setUserId] = useState("")

    useEffect(() => {
        setUserId(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt('Enter name for chat');

        if(roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${userId}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>last msg</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat
