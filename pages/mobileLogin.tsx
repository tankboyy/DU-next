import { useRouter } from "next/router";
import React from "react";
import MobileLoginComponent from "../components/mobile/mobileLoginComponent";
import { firebaseAuth } from "../hooks/firebase";

function MobileLogin() {
  const router = useRouter();
  if(firebaseAuth.currentUser !== null) router.push("/")
  return (
    <>
     <MobileLoginComponent />
    </>
  );
}

export default MobileLogin;