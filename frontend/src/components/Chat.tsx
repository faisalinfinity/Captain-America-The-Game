import React from "react";
import { GlobalContext } from "../Context/GlobalContext";
const Chat = () => {
  const {
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
    room
  } = React.useContext(GlobalContext);
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <h1>{gameReady ? "Ready to Start" : "Waiting for other Player"}</h1>
      <h1>My Score :{scores}</h1>
      <h1>Player 2 Score:{p2Scores}</h1>
      <button
        onClick={() => {
          if (gameReady) {
            IncreaseScore();
          }
        }}
      >
        Increase
      </button>
      <input
        placeholder="Enter Random Number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={()=>handleRoom(room)}>Join Room</button>
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
