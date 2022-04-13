import "./style/chat.css";
import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [message, setMessage] = useState("");

  axios.get("http://localhost:3000/chat").then((res) => {});

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
