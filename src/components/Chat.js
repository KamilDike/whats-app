import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFile from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {useParams} from 'react-router-dom'
import db from '../Firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'

function Chat() {
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue
                .serverTimestamp(),
        })
        setInput('');
    }

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => 
                    doc.data()))
            ))
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last active {' '}

                        {messages.length > 0 && new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate())
                            .toUTCString()}
                        
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${
                        message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                            {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input placeholder="message" value={input} 
                        onChange={e => setInput(e.target.value)}   
                    />
                    <button onClick={sendMessage} type="submit">Click me</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
