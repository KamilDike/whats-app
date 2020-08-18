import React, {useState, useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'

function SidebarChat( {addNewChat} ) {

    const [userId, setUserId] = useState("")

    useEffect(() => {
        setUserId(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt('Enter name for chat');

        if(roomName) {
            
        }
    };

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${userId}.svg`}/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>last msg</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat
