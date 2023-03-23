import { User } from "firebase/auth";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type iUSER = {
  id: string;
  name: string;
  gender: string;
  login: boolean;
};

const { persistAtom } = recoilPersist();

export const userState = atom<iUSER>({
  key: "userState",
  default: {
    id: "",
    name: "",
    gender: "",
    login: false,
  },
  effects_UNSTABLE: [persistAtom],
});



const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const persistAtom2 = recoilPersist({
  key: "userStorage",
  storage: sessionStorage,
});

export const userAtom = atom<User>({
  key: "userState2",
  effects_UNSTABLE: [persistAtom2.persistAtom],
});

