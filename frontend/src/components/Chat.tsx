import React, { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client"


interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    receive_message: (data: Data) => void;
}

interface Data {
    message: String;
    room: String;
}
interface ClientToServerEvents {
    send_message: (data: Data) => void;
    receive_message: (data: Data) => void;
    join_room: (message: string) => void;
    hello: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080")


const Chat = () => {
    const [value, setValue] = useState<string>("")
    const [room, setRoom] = useState<string>("")
    const [messages, setMessages] = useState<Data[]>([]);
   
   
   
    const handleReceiveMessage = (data: Data) => {
        alert(data.message)
        setMessages((prevMessages) => [...prevMessages, data]);
    };

    const sendMessage = () => {
        if(room!==""){
            socket.emit("send_message", { message: value, room })
        }else{
            alert("Enter Room No First")
        }
       
    }

    const handleRoom = () => {
        socket.emit("join_room", room)
    }

    useEffect(() => {
        socket.on("receive_message", handleReceiveMessage)
    }, [socket])

    return (
        <div>
            <input placeholder='Enter Random Number' onChange={(e) => setRoom(e.target.value)} />
            <button onClick={handleRoom}>Join Room</button>
            <input placeholder='Message...' onChange={(e) => setValue(e.target.value)} />
            <button onClick={sendMessage}>Send</button>

        </div>
    )
}

export default Chat