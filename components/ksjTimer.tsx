import React, { useEffect, useRef, useState } from "react";
import { animated, config, useSpring } from "@react-spring/web";

function KsjTimer() {
  const [ksjDate, setKsjDate] = useState([0, 0, 0, 0]);
  useEffect(() => {
    function tick() {
      setTimeout(() => {
        let amount =
          (new Date().getTime() - new Date(2022, 5, 9, 18).getTime()) / 1000;
        const ksjDay = Math.floor(amount / 86400);
        amount = amount % 86400;
        const ksjHorus = Math.floor(amount / 3600);
        amount = amount % 3600;
        const ksjMinute = Math.floor(amount / 60);
        amount = amount % 60;
        const ksjSecond = Math.floor(amount);
        setKsjDate([ksjDay, ksjHorus, ksjMinute, ksjSecond]);
      }, 1000);
    }

    return tick();
  });

  const ksjM = useSpring({ number: ksjDate[3], from: { number: 0 } });
  const ksjM2 = useSpring({ number: ksjDate[2], from: { number: 0 } });
  const ksjM3 = useSpring({ number: ksjDate[1], from: { number: 0 } });
  const ksjM4 = useSpring({ number: ksjDate[0], from: { number: 0 } });

  return (
    <div>
      <div style={{ display: "flex" }}>
        <animated.div>{ksjM4.number.to((n) => n.toFixed())}</animated.div>
        <div>일</div>
        <animated.div>{ksjM3.number.to((n) => n.toFixed())}</animated.div>
        <div>시간</div>
        <animated.div>{ksjM2.number.to((n) => n.toFixed())}</animated.div>
        <div>분</div>
        <animated.div>{ksjM.number.to((n) => n.toFixed())}</animated.div>
        <div>초</div>
      </div>
    </div>
  );
}

export default KsjTimer;
