import React, { createContext, useRef } from "react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as SocketIOClient from 'socket.io-client';
interface GlobalType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  gameReady: boolean;
  scores: number;
  IncreaseScore: () => void;
  setRoom: React.Dispatch<React.SetStateAction<string | null>>;
  p2Scores: number;
  handleRoom: (data: string) => void;
  messages: Data[];
  sendMessage: () => void;
  setScores: React.Dispatch<React.SetStateAction<number>>;
  sendScores: (data: number) => void;
  socketRef: any;
  room: string | null,
  setp2Scores: React.Dispatch<React.SetStateAction<number>>
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
  room: string | null;
  type?: String;
}
export interface Scores {
  scores: any;
  room: string | null;
}
interface ClientToServerEvents {
  send_message: (data: Data) => void;
  receive_message: (data: Data) => void;
  join_room: (message: string | null) => void;
  send_scores: (data: Scores) => void;
}


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
  sendScores: (data: number) => { },
  socketRef: null,
  room: "",
  setp2Scores: () => { }
});


const GlobalContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {

  const [value, setValue] = useState<string>("");
  let [room, setRoom] = useState<string | null>("");
  const [messages, setMessages] = useState<Data[]>([]);
  const [scores, setScores] = useState<number>(0);
  const [p2Scores, setp2Scores] = useState<number>(0);
  const [gameReady, setgameReady] = useState<boolean>(false);
  let socketRef: any = useRef()
  useEffect(() => {
    socketRef.current = io(
      "wss://captainamerica.onrender.com"
    );
  }, [])
  const handleReceiveMessage = (data: Data) => {
    data.type = "r";
    setMessages((prevMessages) => [...prevMessages, { ...data }]);
  };

  const sendMessage = () => {
    if (room == "") {
      room = localStorage.getItem("room")
      handleRoom(room)
    }
    if (value !== "") {
      if (room !== "") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: value, room },
        ]);
        if (socketRef.current) {
          socketRef.current.emit("send_message", { message: value, room });
        }

      } else {
        alert("Enter Room No First");
      }
      setValue("");
    }
  };

  const handleReceiveScores = (data: Scores) => {
    setp2Scores(data.scores);
    if (data.scores !== 0) {
      localStorage.setItem("score2", data.scores);
    }
  };

  const sendScores = (scores: number) => {
    if (room == "") {
      room = localStorage.getItem("room")
      handleRoom(room)
    }
    if (socketRef.current) {
      socketRef.current.emit("send_scores", { scores, room });
    }

  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("waitingForPlayer", () => {
        console.log("Waiting for other player to join...");
        setgameReady(false)
      });

      socketRef.current.on("gameReady", () => {
        console.log("Both players are ready to start the game!");
        setgameReady(true);
      });

      socketRef.current.on("playerDisconnected", () => {
        console.log("Other player disconnected");
        setgameReady(false)
        // Show a message to the remaining player that the other player has disconnected
      });

      if (socketRef.current) {
        socketRef.current.on("disconnect", () => {
          console.log("You disconnected")
        });
      }
    }




  }, [socketRef.current]);

  // useEffect(() => {
  //   sendScores(scores);
  // }, [scores]);

  const handleRoom = (room1: string | null) => {
    if (room1 == "") {
      room1 = localStorage.getItem("room")
    }
    if (socketRef.current) {
      socketRef.current.emit("join_room", room1);
    }

  };

  const IncreaseScore = () => {
    let id = setInterval(() => {
      setScores((p) => p + 1);
    }, 500);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("receive_message", handleReceiveMessage);
      return () => {
        if (socketRef.current) {
          socketRef.current.off("receive_message", handleReceiveMessage);
        }

      };
    }

  }, [socketRef.current, messages]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("receive_scores", handleReceiveScores);
      return () => {
        socketRef.current.off("receive_scores", handleReceiveScores);
      };
    }

  }, [socketRef.current]);


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
        socketRef,
        room,
        setp2Scores
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
