import React, { useState } from "react";
import axios from "axios";
import { LogType } from "../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";
import {
  Box,
  createTheme,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import { getOSByUserAgent, isMacOS, isMobileWeb, isServer, uniqBy } from "@toss/utils";

function BookingUsers() {
  const [logs, setLogs] = useState<LogType[]>([]);
  const setPlayers = useSetRecoilState(playersState);
  const players = useRecoilValue(filterPlayers);
  const [open, setOpen] = useState(false);

  const getLog = async () => {
    if (open) {
      setOpen(!open);
      return;
    }
    setOpen(!open);
    axios.get<LogType[]>("/getReserveLog").then(({ data }) => {
      const newData = uniqBy(data, item => item.data.userId)
      setLogs(newData);
    });
  };

  const addPlayer = (userName: string) => {
    if (players.includes(userName)) return;
    setPlayers((players) => [...players, userName]);
  };
  return (
    <div className={"w-80 flex"}>
      <Box
        sx={{
          bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
          pb: open ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => getLog()}
          sx={{
            px: 3,
            pt: 2.5,
            pb: open ? 2.5 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary="불러오기"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          ></ListItemText>
        </ListItemButton>

        {open &&
          logs.map((log, i) => (
            <ListItemButton
              key={i}
              onClick={() => addPlayer(log.data.userId)}
              sx={{ py: 0, minHeight: 32, color: "rgba(black)" }}
            >
              <ListItemText
                primary={log.data.userId}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          ))}
      </Box>
    </div>
  );
}

export default BookingUsers;
