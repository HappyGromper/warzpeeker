import "./App.css";
import React, { useState } from "react";

function MinecraftServers() {
  const [servers, setServers] = useState([
    { name: "WarZ 1", address: "1.mc-warz.com" },
    { name: "WarZ 2", address: "2.mc-warz.com" },
    { name: "WarZ 3", address: "3.mc-warz.com" },
    { name: "WarZ 4", address: "4.mc-warz.com" },
  ]);

  const [playerCounts, setPlayerCounts] = useState({});

  async function fetchServerStatus() {
    const newCounts = {};
    for (const server of servers) {
      const response = await fetch(
        //maybe switch to https://mcstatus.io
        `https://api.mcsrvstat.us/2/${server.address}`
      );
      const data = await response.json();
      if (data.online) {
        newCounts[server.address] = data.players.online;
      } else {
        newCounts[server.address] = 0;
      }
    }
    setPlayerCounts(newCounts);
  }

  function handleRefreshClick() {
    fetchServerStatus();
  }

  return (
    <div>
      <h1>MC WarZ Player Counts</h1>
      
      
      <ul>
        {servers.map((server) => (
          <li key={server.address}>
            <p>
              <strong>{server.name}</strong>:{" "}
              {playerCounts[server.address] ?? "Unknown"}
            </p>
          </li>
        ))}
      </ul>
      <p>
        <strong>Info:</strong> This app shows the current player count for each of the BMcBrawl.com WarZ Minecraft servers (x.mc-warz.com). It may take 2 minutes for the player count to update properly.
      </p>
      <button onClick={handleRefreshClick}>Refresh</button>
    </div>
  );
}

export default MinecraftServers;
