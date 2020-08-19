import React, { useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFile from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {useParams} from 'react-router-dom'

function Chat() {
    const [input, setInput] = useState('')
    const { roomId } = useParams();

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Seen</p>
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
                <p className={`chat__message ${true && "chat__reciever"}`}>
                    <span className="chat__name">Kotaro</span>
                    Hi
                    <span className="chat__timestamp">21:47</span>
                </p>
                <p className="chat__message">
                    Hi Kotaro
                </p>
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
