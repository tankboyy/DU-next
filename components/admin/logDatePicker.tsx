import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Button, ButtonGroup } from "@mui/material";
import { GAMELOG } from "./adminLog";
import useGetYMDHM from "../../hooks/useGetYMDHM";
import axios from "axios";

const startTime = new Date();
startTime.setDate(1);
startTime.setHours(0, 0);

export default function LogDatePicker({
  setGameLogs,
}: {
  setGameLogs: React.Dispatch<React.SetStateAction<GAMELOG[]>>;
}) {
  const [value, setValue] = React.useState<DateRange<Date>>([
    startTime,
    new Date(),
  ]);
  console.log(`START: ${value[0]} END: ${value[1]}`);
  const onClickGameLogs = async () => {
    const [start, end] = value;
    const { data } = await axios.post(`api/logs/all`, { start, end });
    console.log(data);
    const newData: GAMELOG[] = [];
    let checkedData: any = {};
    data.map((item: GAMELOG, i: number) => {
      const a = { [item.gameName]: [item.userId] };
      if (!checkedData[useGetYMDHM(new Date(item.currentTime)).split(" ")[0]])
        checkedData[useGetYMDHM(new Date(item.currentTime)).split(" ")[0]] = {
          축구: [],
          보드게임: [],
          플스: [],
          컴퓨터: [],
          포켓볼: [],
          오락기: [],
          탁구: [],
          책마루: [],
          충전: [],
          신규가입: [],
          스위치: [],
          노래방: [],
        };
      // if(checkedData[useGetYMDHM(new Date(item.currentTime)).split(" ")[0]][item.gameName])
      if (
        !checkedData[useGetYMDHM(new Date(item.currentTime)).split(" ")[0]][
          item.gameName
        ].includes(item.userId)
      ) {
        checkedData[useGetYMDHM(new Date(item.currentTime)).split(" ")[0]] = {
          ...checkedData[useGetYMDHM(new Date(item.currentTime)).split(" ")[0]],
          [item.gameName]: [
            ...checkedData[
              useGetYMDHM(new Date(item.currentTime)).split(" ")[0]
            ][item.gameName],
            item.userId,
          ],
        };
        newData.push({
          ...item,
          currentTime: useGetYMDHM(new Date(item.currentTime)),
          id: i + 1,
        });
      }
    });
    setGameLogs(newData);
  };

  const onChangeToday = () => {
    const time = new Date();
    time.setHours(0, 0, 0);
    setValue([time, new Date()]);
  };

  const onChangeWeekly = () => {
    const start = new Date();
    start.setHours(0, 0, 0);
    start.setDate(
      start.getDate() + (start.getDay() !== 0 ? -start.getDay() + 1 : -6)
    );
    setValue([start, new Date()]);
  };

  return (
    // <div>
    // 	<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}>
    // 		<div style={{ color: "red" }}>Don't forget to check the weather!</div>
    // 	</DatePicker>
    // </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ButtonGroup variant="outlined" sx={{ mr: 4 }}>
        <Button onClick={onChangeToday}>오늘</Button>
        <Button onClick={onChangeWeekly}>일주일</Button>
      </ButtonGroup>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3} direction="row">
          <MobileDateRangePicker
            startText="start"
            value={value}
            inputFormat={"yyyy-MM-dd"}
            mask={"____-__-__"}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> ~ </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
          <Button variant="outlined" onClick={onClickGameLogs}>
            검색
          </Button>
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
