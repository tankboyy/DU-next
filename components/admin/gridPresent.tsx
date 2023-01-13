import React, { useState } from "react";
import { utils, writeFile } from "xlsx";
import { GAMELOG } from "./adminLog";
import { Button } from "@mui/material";
import { Texcelobj } from "../types";
import { roomNames } from "../../public/list";

type Tlog = {
  userName: string;
  gameName: string;
  userGender: string;
  currentTime: string;
  id: number;
};

function GridPresent({ data }: { data: GAMELOG[] }) {
  const [datas2, setDatas2] = useState<any>([]);
  const [typingData, setTypingData] = useState<any>();

  let result: any[] = [];

  const days1 = () => {
    const days = [];
    days.push("날짜");
    for (let iq = 1; iq < 32; iq++) {
      days.push(iq);
      days.push("일");
    }
    return days;
  };

  roomNames.map((item: string, index: number) => {
    let data = new Array(63).fill(0);
    data[0] = item;
    result.push(data);
  });

  const typing = (event: any) => {
    const data = event.target.value.split("\t");
    const filter = [];
    for (let i = 0; i < data.length; i += 10) {
      const newData = data.slice(i, i + 10);
      filter.push(newData);
    }
    // let result: number | string[][] = new Array(11).fill(new Array(32).fill(0))

    let MG: number[] = [0, 0];

    filter.map((item) => {
      const date = item[3]?.split(",")[1];
      const room: string = item[4];
      const index: number = roomNames.findIndex((item) => item === room);
      const age: string = item[6];
      if (age === "성인") {
        if (item[7] !== "") MG[0] += parseInt(item[7]);
        if (item[8] !== "") MG[1] += parseInt(item[8]);
        console.log(item[7], item[8], MG);
      }
      console.log(
        parseInt(date?.slice(4)),
        room,
        Number.isNaN(parseInt(date?.slice(4)))
      );
      if (!Number.isNaN(parseInt(date?.slice(4)))) {
        result[index][parseInt(date?.slice(4)) * 2 - 1] = parseInt(item[7]);
        result[index][parseInt(date?.slice(4)) * 2] = parseInt(item[8]);
      }
    });
    result.push(MG);
    return result;
  };

  let newData: GAMELOG[][] = [];
  const dateArr: string[] = [];
  data.map((item: GAMELOG) => {
    const date = item.currentTime.split(" ")[0];
    if (!dateArr.find((item) => item === date)) {
      dateArr.push(date);
    }
  });
  for (let i = 0; i < dateArr.length; i++) newData.push([]);
  data.map((item: GAMELOG) => {
    const date = item.currentTime.split(" ")[0];
    const index = dateArr.findIndex((item) => item === date);
    newData[index].push(item);
  });

  const mountData: Texcelobj[] = [];
  const datas: any[] = [];

  type TuserName = {
    gameNames: string[];
  };

  type Tchecked = {
    userName: TuserName;
  };

  newData.map((item: GAMELOG[]) => {
    const obj: Texcelobj = {
      일자: "",
      컴퓨터: 0,
      플스: 0,
      포켓볼: 0,
      농구게임: 0,
      축구: 0,
      오락기: 0,
      보드게임: 0,
      탁구: 0,
      책마루: 0,
      핸드폰충전: 0,
      신규가입: 0,
      총수: 0,
      어울림터연인원: 0,
      어울림터실인원: 0,
      정남: 0,
      정여: 0,
      책남: 0,
      책여: 0,
      어남: 0,
      어여: 0,
      노남: 0,
      노여: 0,
    };

    const checkedUser: string[] = [];
    let checked: Tchecked;
    item.map((data: GAMELOG) => {
      switch (data.gameName) {
        case "컴퓨터":
          obj.컴퓨터 += 1;
          if (data.userGender === "남자") obj.정남 += 1;
          else obj.정여 += 1;
          break;
        case "플스":
          obj.플스 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "포켓볼":
          obj.포켓볼 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "농구게임":
          obj.농구게임 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "축구":
          obj.축구 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "오락기":
          obj.오락기 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "보드게임":
          obj.보드게임 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "책마루":
          obj.책마루 += 1;
          if (data.userGender === "남자") obj.책남 += 1;
          else obj.책여 += 1;
          break;
        case "타악구":
          obj.탁구 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "탁구":
          obj.탁구 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "충전":
          obj.핸드폰충전 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        case "신규가입":
          obj.신규가입 += 1;
          if (data.userGender === "남자") obj.어남 += 1;
          else obj.어여 += 1;
          if (
            checkedUser.find((id: string) => id === data.userName) === undefined
          )
            checkedUser.push(data.userName);
          break;
        default:
      }
    });
    const WEEKDAY = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const date = item[0].currentTime.split(" ")[0];
    const i = new Date(date).getDay();
    obj.일자 = `${WEEKDAY[i]}, ${date.split(".")[1]}월 ${date.split(".")[2]}, ${
      date.split(".")[0]
    }`;
    obj.총수 = item.length;
    obj.어울림터연인원 = obj.총수 - (obj.컴퓨터 + obj.책마루);
    obj.어울림터실인원 = checkedUser.length;
    mountData.push(obj);
  });

  async function onClick() {
    const ws = utils.json_to_sheet(mountData);
    const wb = utils.book_new();
    console.log(mountData)
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, "Test.xls");
  }

  async function onClick2() {
    console.log(typingData)
    let result = typing(typingData);

    // let result: any[] = []
    // roomNames.map((item: string, index: number) => {
    // 	let data = new Array(63).fill(0)
    // 	data[0] = item
    // 	result.push(data)
    // })
    data.map((item, i) => {
      if (item.gameName === "컴퓨터") {
        const index = 0;
        const date = parseInt(item.currentTime.slice(8, 10));
        if (item.userGender === "남자") result[index][date * 2 - 1] += 1;
        else result[index][date * 2] += 1;
      } else if (item.gameName === "책마루") {
        const index = 1;
        const date = parseInt(item.currentTime.slice(8, 10));
        if (item.userGender === "남자") result[index][date * 2 - 1] += 1;
        else result[index][date * 2] += 1;
      } else {
        const index = 2;
        const date = parseInt(item.currentTime.slice(8, 10));
        if (item.userGender === "남자") result[index][date * 2 - 1] += 1;
        else result[index][date * 2] += 1;
      }
    });
    console.log(result);
    lastF();
    const day1 = days1();
    result.unshift(day1);
    const ws = utils.aoa_to_sheet(result);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, "Test.xls");
  }

  const lastF = () => {
    for (let i in roomNames) {
      const name = roomNames[i];
      const data = result[i];
      const newData = [];
      newData.push("연인원" + name);
      console.log(data);
      for (let i = 1; i < 63; i = i + 2) {
        if (isNaN(data[i])) data[i] = 0;
        if (isNaN(data[i + 1])) data[i + 1] = 0;
        newData.push(data[i] + data[i + 1]);
        // console.log(data[i] + data[i+1])
      }
      result.push(newData);
    }
    const ff = Array(32).fill(0);
    ff[0] = "어울림터 실인원";
    mountData.map((item) => {
      const index = parseInt(item.일자.split(" ")[2].slice(0, 2));
      ff[index] = item.어울림터실인원;
    });
    result.push(ff);
    // result.map(item => {
    // 	console.log(item)
    // })
  };

  return (
    <div>
      <Button disabled={data.length === 0} onClick={onClick}>
        선물..
      </Button>
      <input type="text" onChange={() => setTypingData(event)} />
      <Button disabled={data.length === 0} onClick={onClick2}>
        선물..2
      </Button>
    </div>
  );
}

export default GridPresent;
