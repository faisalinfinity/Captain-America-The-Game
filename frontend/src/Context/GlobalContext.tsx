import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface GlobalType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  gameReady: boolean;
  scores: number;
  IncreaseScore: () => void;
  setRoom: React.Dispatch<React.SetStateAction<string|null>>;
  p2Scores: number;
  handleRoom: (data: string) => void;
  messages: Data[];
  sendMessage: () => void;
  setScores: React.Dispatch<React.SetStateAction<number>>;
  sendScores: (data:number) => void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  room: string|null,
  setp2Scores:React.Dispatch<React.SetStateAction<number>>
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receive_message: (data: Data) => void;
  receive_scores: (data: Scores) => void;
  waitingForPlayer: () => void;
  gameReady: () => void;
  playerDisconnected: () => void
}

interface Data {
  message: string;
  room: string |null;
  type?: String;
}
export interface Scores {
  scores: number;
  room: string|null;
}
interface ClientToServerEvents {
  send_message: (data: Data) => void;
  receive_message: (data: Data) => void;
  join_room: (message: string|null) => void;
  send_scores: (data: Scores) => void;
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8080"
);

export const GlobalContext = createContext<GlobalType>({
  value: "",
  setValue: () => { },
  gameReady: false,
  scores: 0,
  IncreaseScore: () => { },
  setRoom: () => { },
  p2Scores: 0,
  handleRoom: (data: string) => { },
  messages: [],
  sendMessage: () => { },
  setScores: () => { },
  sendScores: (data:number) => { },
  socket: socket,
  room: "",
  setp2Scores:()=>{}
});


const GlobalContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {

  const [value, setValue] = useState<string>("");
  let [room, setRoom] = useState<string|null>("");
  const [messages, setMessages] = useState<Data[]>([]);
  const [scores, setScores] = useState<number>(0);
  const [p2Scores, setp2Scores] = useState<number>(0);
  const [gameReady, setgameReady] = useState<boolean>(false);

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

  const sendScores = (scores:number) => {
    if(room==""){
      room=localStorage.getItem("room")
     }
    socket.emit("send_scores", { scores, room });
  };

  useEffect(() => {
    socket.on("waitingForPlayer", () => {
      console.log("Waiting for other player to join...");
      setgameReady(false)
    });

    socket.on("gameReady", () => {
      console.log("Both players are ready to start the game!");
      setgameReady(true);
    });

    socket.on("playerDisconnected", () => {
      console.log("Other player disconnected");
      setgameReady(false)
      // Show a message to the remaining player that the other player has disconnected
    });

    if (socket) {
      socket.on("disconnect", () => {
        console.log("You disconnected")
      });
    }
  }, [socket]);

  useEffect(() => {
    sendScores(scores);
  }, [scores]);

  const handleRoom = (room1: string|null) => {
    if(room1==""){
     room1=localStorage.getItem("room")
    }
    socket.emit("join_room", room1);
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

  // useEffect(() => {
  //   socket.on("receive_scores", handleReceiveScores);
  //   return () => {
  //     socket.off("receive_scores", handleReceiveScores);
  //   };
  // }, [socket]);


  return (
    <GlobalContext.Provider
      value={{
        value,
        setValue,
        gameReady,
        scores,
        IncreaseScore,
        setScores,
        setRoom,
        p2Scores,
        handleRoom,
        messages,
        sendMessage,
        sendScores,
        socket,
        room,
        setp2Scores
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
