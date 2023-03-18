import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import AdminGameList from "../admin/adminGameList";
import { GAMETYPE } from "../types";
import {
  boardGameReserved,
  resSoloGame,
  useGetGamesData,
  useMutationNewReservedGame,
  useResSoloGame,
} from "../../hooks/reactQuerys/games";
import { styled } from "@mui/material/styles";
import {
  Alert,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useEndTime from "../../hooks/useEndTime";
import { GameType } from "../../types/game";
import UseBackDrop from "../useBackDrop";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const gameList = [
  "축구",
  "포켓볼",
  "탁구",
  "플스",
  "스위치",
  "오락기",
  "컴퓨터",
  "충전",
  "노래",
];

type PropsType = {};

function NewPcGameList(props: PropsType) {
  const [games, setGames] = useState<GameType[]>();
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const { data, status, isFetching } = useGetGamesData();
  const resSolo = useMutationNewReservedGame();
  const setData = useSetRecoilState(playersState);
  const players = useRecoilValue(filterPlayers);

  useEffect(() => {
    if (status === "success") {
      setGames(data);
    }
  }, [isFetching]);

  const setPlayers = () => {
    const prev = [...players];
    const returnData = prev.shift();
    setData(prev);
    return returnData;
  };
  const queryClient = useQueryClient();

  const onReserve = async (gName: string, i: number) => {
    if(players.length === 0) {
      setSnackOpen(
        true
      )
      return;
    }
    setLoading(true);
    const check = await axios.post("/api/logs/checkedLog", {
      gameName: gName,
      userId: players[0],
    });

    if (!check) {
      setLoading(false);
      return;
    }

    setSnackOpen(true)
    resSolo.mutate(
      { targetGameIndex: i, userId: players[0], targetGameName: gName },
      {
        onSuccess: async () => {
          setLoading(false);
          const player = setPlayers();
          await axios
            .post("/addReserveLog", {
              gameName: gName,
              userId: player,
            })
            .then(() => queryClient.invalidateQueries(["gamesData"]));
        },
      }
    );
  };

  const resBoardG = (name: string) => {
    if (players[0] === undefined) return;
    boardGameReserved({ name, userIds: [players[0]] }).then(() => {
      axios.post("/addReserveLog", {
        gameName: name,
        userId: players[0],
      });
      setPlayers();
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <div>
      {loading && <UseBackDrop bdOpen={loading} />}
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          예약 성공!
        </Alert>
      </Snackbar>
      <div className={"flex flex-row"}>
        <Typography className={"p-2"}>
          불러온 시간: {new Date().getHours()}시 {new Date().getMinutes()}분{" "}
          {new Date().getSeconds()}초
        </Typography>
        <IconButton
          onClick={() => queryClient.invalidateQueries(["gamesData"])}
        >
          <RestartAltIcon />
        </IconButton>
      </div>
      {status === "loading" ? (
        <div>로딩중..zz.</div>
      ) : (
        <div className={"flex justify-center"}>
          {games ? (
            <div>
              <Grid container spacing={2}>
                {games.map((item) => (
                  <Grid xs={"auto"} md={4} className="">
                    <Typography variant="h5">{item.gameId}</Typography>
                    <Stack direction={{ xs: "row", md: "row" }} spacing={0.5}>
                      {Object.values(item.gameData).map((user, i) => (
                        <Item
                          className={"pr-0.5 bg-sky-200"}
                          onClick={() => onReserve(item.gameId, i)}
                        >
                          <Typography
                            variant="body2"
                            className={`${user.userId && "bg-gray-300"}`}
                          >
                            {user.userId === ""
                              ? "빈자리"
                              : item.gameId !== "충전"
                              ? `${user.userId} | ${useEndTime(
                                  new Date(user.startTime),
                                  40
                                )}분`
                              : user.userId}
                          </Typography>
                        </Item>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <Grid container className={"justify-around"}>
                <Grid>
                  <Typography
                    onClick={() => resBoardG("보드게임")}
                    variant={"h2"}
                  >
                    보드게임
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant={"h2"}
                    onClick={() => resBoardG("책마루")}
                  >
                    책마루
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default NewPcGameList;
