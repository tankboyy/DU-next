import React, { useEffect, useState } from "react";
import { Tgames } from "./friendsSearch";
import axios from "axios";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import useEndTime from "../hooks/useEndTime";
import AutorenewIcon from '@material-ui/icons/Autorenew';

interface GVtype {
  arr: boolean[];
  setGameData: React.Dispatch<React.SetStateAction<Tgames[] | null>>;
  setArr: React.Dispatch<React.SetStateAction<boolean[]>>;
  data: Tgames;
  players: string[];
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameView({
  data,
  players,
  setChecked,
  arr,
  setArr,
  setGameData,
}: GVtype) {
  useEffect(() => {
    setArr([]);
    setChecked(false);
  }, [data, players]);

  const [loading, setLoading] = useState(false);

  if (data.id === "책마루" || data.id === "보드게임") setChecked(true);

  const plusArr = (i: number) => {
    let newArr: boolean[] = [...arr];
    newArr[i] = !newArr[i];
    const check = newArr.filter((item) => item);
    if (check.length === players.length) setChecked(true);
    else setChecked(false);
    if (check.length > players.length) {
      alert("최대 인원수를 초과하였습니다.");
      return;
    }
    setArr([...newArr]);
  };

  async function getGames() {
    setLoading(true);
    // await graphqlReq.request(GET_GAMES)
    axios.get(`api/game`).then(({ data }) => {
      setGameData(data.games);
      setLoading(false);
    });
  }

  if (data.id === "책마루" || data.id === "보드게임") {
    return (
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          style={{
            textAlign: "center",
            display: "flex",
            // flexDirection: "center",
          }}
        >
          {data.id}
        </Typography>
        <Typography variant="h6">바로 예약누르시면 됩니다.</Typography>
      </div>
    );
  }

  return (
    <div key={data.id}>
      <Typography
        variant="h2"
        gutterBottom={true}
        component="div"
        style={{
          textAlign: "center",
          display: "flex",
          // flexDirection: "center",
          alignItems: "center",
        }}
      >
        {data.id}
        <Button variant="text" onClick={getGames}>
          <AutorenewIcon />
        </Button>
      </Typography>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          {data.users?.map((item, i) => (
            <div style={{ width: 600 }} key={i}>
              <Container maxWidth="xs">
                <Box m={1}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      {i + 1}번 자리
                    </Grid>
                    {item.userId ? (
                      <>
                        <Grid item xs={3}>
                          {item.userId}
                        </Grid>
                        <Grid item xs={3}>
                          {data.id !== "충전"
                            ? useEndTime(new Date(item.startTime), 40)
                            : null}
                        </Grid>
                      </>
                    ) : (
                      <Grid item xs={6}>
                        사용가능{item.userId}
                      </Grid>
                    )}
                    <Grid item xs={3}>
                      <Button
                        disabled={!!item.userId}
                        color={arr[i] ? "success" : "primary"}
                        variant="outlined"
                        onClick={() => plusArr(i)}
                      >
                        {arr[i] ? <div>선택됨</div> : <div>예약하기</div>}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameView;
