import React from "react";
import axios from "axios";
import { LogType } from "../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";

function BookingUsers() {
  const [logs, setLogs] = React.useState<LogType[]>([]);
  const setPlayers = useSetRecoilState(playersState);
  const players = useRecoilValue(filterPlayers);

  const getLog = async () => {
    const { data } = await axios.get("/getReserveLog");
    console.log(data);
    setLogs(data);
  }

  const addPlayer = (userName: string) => {
    if(players.includes(userName)) return
    setPlayers((players) => [...players, userName]);
  }
  return (
    <div className={"justify-center w-32"}>
      <button onClick={()=>getLog()}>불러오기</button>
      {logs && (
        <ul>
          {logs.map((log, index) => (
            <div key={index} onClick={() => addPlayer(log.data.userId)}>
              <li>{log.data.userId}</li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingUsers;