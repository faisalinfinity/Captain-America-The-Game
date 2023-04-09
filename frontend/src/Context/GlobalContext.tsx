import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface GlobalType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  gameReady: boolean;
  scores: number;
  IncreaseScore: () => void;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  p2Scores: number;
  handleRoom: () => void;
  messages: Data[];
  sendMessage: () => void;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receive_message: (data: Data) => void;
  receive_scores: (data: Scores) => void;
  waitingForPlayer: () => void;
  gameReady: () => void;
  playerDisconnected: () => void;
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

export const GlobalContext = createContext<GlobalType>({
  value: "",
  setValue: () => {},
  gameReady: false,
  scores: 0,
  IncreaseScore: () => {},
  setRoom: () => {},
  p2Scores: 0,
  handleRoom: () => {},
  messages: [],
  sendMessage: () => {},
});

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8080"
);
const GlobalContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [value, setValue] = useState<string>("");
  const [room, setRoom] = useState<string>("");
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

  const sendScores = () => {
    socket.emit("send_scores", { scores, room });
  };

  useEffect(() => {
    socket.on("waitingForPlayer", () => {
      console.log("Waiting for other player to join...");
      setgameReady(false);
    });

    socket.on("gameReady", () => {
      console.log("Both players are ready to start the game!");
      setgameReady(true);
    });

    socket.on("playerDisconnected", () => {
      console.log("Other player disconnected");
      setgameReady(false);
      // Show a message to the remaining player that the other player has disconnected
    });

    if (socket) {
      socket.on("disconnect", () => {
        console.log("You disconnected");
      });
    }
  }, [socket]);

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
    <GlobalContext.Provider
      value={{
        value,
        setValue,
        gameReady,
        scores,
        IncreaseScore,
        setRoom,
        p2Scores,
        handleRoom,
        messages,
        sendMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
