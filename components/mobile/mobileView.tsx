import React from "react";
import MobileGameList from "./mobileGameList";
import MobileLayout from "./mobileLayout";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/user";
import MobileLoginComponent from "./mobileLoginComponent";
import { useRouter } from "next/router";

type PropsType = {};

function MobileView(props: PropsType) {
  const getUserKey = useRecoilValue(userAtom);
  const router = useRouter();
  console.log(getUserKey);
  if (getUserKey.userKey === "") router.push("/mobileLogin");

  return (
    <div>
      <>
        <MobileLayout />
        <MobileGameList />
      </>
    </div>
  );
}

export default MobileView;
