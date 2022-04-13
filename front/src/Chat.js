import "./style/chat.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const url = "http://localhost:3000/chat";

function Chat() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient(url);
    socket.on("FromAPI", (data) => {
      setMessage(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <ul id="messages"></ul>
      <div class="zone_saisie">
        <input
          id="m"
          onclick={(e) => {
            setMessage(e.target.value);
          }}
        />{" "}
        <button onclick={"send()"}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
