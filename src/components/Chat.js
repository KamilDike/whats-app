import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, Button } from '@material-ui/core'
import {useParams} from 'react-router-dom'
import db from '../Firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'
import { useCookies } from 'react-cookie'

function Chat({logout}) {
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('')
    const [photoId, setPhotoId] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}] = useStateValue();

    const [cookies, setCookie, removeCookie] = useCookies(['logged']);

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
                    setRoomName(snapshot.data().name),
                    setPhotoId(snapshot.data().photoId)
            ))

            db.collection('rooms').doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => 
                        doc.data()))
            ))
        }
    }, [roomId])

    const leave = () => {
        removeCookie('displayName')
        removeCookie('photoURL')
        window.location.reload()
    }

    return (
        !logout? (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${photoId}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last active {' '}
                        {messages.length > 0 && new Date(
                            messages[messages.length - 1]?.timestamp?.toDate())
                                .toUTCString()}
                    </p>
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
                <form>
                    <input placeholder="message" value={input} 
                        onChange={e => setInput(e.target.value)}   
                    />
                    <button onClick={sendMessage} type="submit">Click me</button>
                </form>
            </div>
        </div>
        ) : (
            <div className="chat">
                <div className="chat__header">
                    <div className="logout" onClick={leave}>
                        <Button>Logout</Button>
                    </div>
                </div>
            </div>
        )
    )
}

export default Chat
