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
        if (room !== "") {
            socket.emit("send_message", { message: value, room })
        } else {
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
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
            {/* <input placeholder='Enter Random Number' onChange={(e) => setRoom(e.target.value)} />
            <button onClick={handleRoom}>Join Room</button>
            <input placeholder='Message...' onChange={(e) => setValue(e.target.value)} />
            <button onClick={sendMessage}>Send</button> */}


            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Lorem ipsum dolor sit.</p>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                </div>

                <div className="bg-gray-300 p-4">
                    <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…"/>
                </div>
            </div>
        </div>


    )
}

export default Chat