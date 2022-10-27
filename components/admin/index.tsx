import React from "react";
import AdminTaps from "./adminTaps";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { userState } from "../../recoil/user";

function AdminRoot() {
  const [userData, setUserData] = useRecoilState(userState);

  return (
    <div>
      {userData.id === "오석중" ? (
        <AdminTaps />
      ) : (
        <>
          <p>허가된 유저만 접속이 가능합니다</p>
          <Link href={"/login"}>
            <a>go login</a>
          </Link>
          <Link href={"/"}>
            <a>go home</a>
          </Link>
        </>
      )}
    </div>
  );
}

export default AdminRoot;
