import "./style/chat.css";
import React from "react";

function Chat() {
  return (
    <div>
      <ul id="messages"></ul>
      <div class="zone_saisie">
          <input id="m" /> <button onclick="send()">Send</button>
      </div>
     
    </div>
  );
}

export default Chat;
