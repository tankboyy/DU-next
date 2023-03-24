import React from "react";
import MobileGameList from "./mobileGameList";
import MobileLayout from "./mobileLayout";
import { useRouter } from "next/router";
import { firebaseAuth } from "../../hooks/firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/user";

type PropsType = {};

function MobileView(props: PropsType) {
  const router = useRouter();
  const [userAtomState, setUserAtomState] = useRecoilState(userAtom);
  if (firebaseAuth.currentUser === null) router.push("/mobileLogin");
  return (
    <div>
      <>
        <div>
          <MobileLayout />
          <MobileGameList />
        </div>
      </>
    </div>
  );
}

export default MobileView;
