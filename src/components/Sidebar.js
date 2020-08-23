import React, {useEffect, useState} from 'react'
import './Sidebar.css'
import { Avatar } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from '../Firebase';
import { useStateValue } from '../StateProvider'
import { Link } from 'react-router-dom'

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{user}] = useStateValue();
    const [input, setInput] = useState('')

    useEffect(() => {
        reloadRooms();
    }, [])

    const reloadRooms = () => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        ))

        return () => {
            unsubscribe();
        }
    }

    const searchRoom = (e) => {
        if (e.key === 'Enter') {
            if (input) {
                setRooms([])
                rooms.forEach(room => {
                    if (room.data.name === input) { setRooms([room]) }
                })
            }
            else {
                reloadRooms()
            }
        }
    }

    return (
        <div className="sidebar">
            <Link to={"/"}>
                <div className="sidebar__header" onClick={reloadRooms}>
                    <Avatar src={user?.photoURL} className="sidebar__headerAvatar"/>
                    <div className="sidebar__headerRight">
                        {user?.displayName}
                    </div>
                </div>
            </Link>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search" value={input} onChange={e => setInput(e.target.value)} onKeyDown={searchRoom}/>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {
                    rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} photoId={room.data.photoId}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
