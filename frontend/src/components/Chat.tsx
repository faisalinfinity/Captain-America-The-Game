import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    receive_message: (data: Data) => void;
    receive_scores: (data: Scores) => void;
    waitingForPlayer: () => void;
    gameReady: () => void
}

interface Data {
    message: String;
    room: String;
    type?: String;
}
interface Scores {
    scores: number;
    room: String;
}
interface ClientToServerEvents {
    send_message: (data: Data) => void;
    receive_message: (data: Data) => void;
    join_room: (message: string) => void;
    send_scores: (data: Scores) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:8080"
);

const Chat = () => {
    const [value, setValue] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [messages, setMessages] = useState<Data[]>([]);
    const [scores, setScores] = useState<number>(0);
    const [p2Scores, setp2Scores] = useState<number>(0);
    const [gameReady, setgameReady] = useState<boolean>(false)


    const handleReceiveMessage = (data: Data) => {
        data.type = "r";
        setMessages((prevMessages) => [...prevMessages, { ...data }]);
    };

    const sendMessage = () => {
        if (value !== "") {
            if (room !== "") {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { message: value, room },
                ]);
                socket.emit("send_message", { message: value, room });
            } else {
                alert("Enter Room No First");
            }
            setValue("");
        }
    };

    const handleReceiveScores = (data: Scores) => {
        setp2Scores(data.scores);
    };

    const sendScores = () => {
        socket.emit("send_scores", { scores, room });
    };


    useEffect(() => {
        socket.on("waitingForPlayer", () => {
            console.log("Waiting for other player to join...");
        });


        socket.on("gameReady", () => {
            console.log("Both players are ready to start the game!");
            setgameReady(true)
        });

    }, [socket])


    useEffect(() => {
        sendScores();
    }, [scores]);

    const handleRoom = () => {
        socket.emit("join_room", room);
    };

    const IncreaseScore = () => {
        let id = setInterval(() => {
            setScores((p) => p + 1);
        }, 500);
    };

    useEffect(() => {
        socket.on("receive_message", handleReceiveMessage);
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    useEffect(() => {
        socket.on("receive_scores", handleReceiveScores);
        return () => {
            socket.off("receive_scores", handleReceiveScores);
        };
    }, [scores]);


    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
            <h1>{gameReady ? "Ready to Start" : "Waiting for other Player"}</h1>
            <h1>My Score :{scores}</h1>
            <h1>Player 2 Score:{p2Scores}</h1>
            <button onClick={() => {
                if (gameReady) {
                    IncreaseScore()
                }
            }}>Increase</button>
            <input
                placeholder="Enter Random Number"
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={handleRoom}>Join Room</button>
            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    {messages?.map((el) => {
                        if (el?.type !== "r") {
                            return (
                                <>
                                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                                        <div>
                                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                                <p className="text-sm">{el.message}</p>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                    </div>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                                <p className="text-sm">{el.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                </div>

                <div className="flex gap-10 bg-gray-300 p-4">
                    <input
                        value={value}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        onChange={(e) => setValue(e.target.value)}
                        className="flex items-center h-10 w-full rounded px-3 text-sm"
                        type="text"
                        placeholder="Type your message…"
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;