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

