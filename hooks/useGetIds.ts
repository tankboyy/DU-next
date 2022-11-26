import hangul from "hangul-js";
import axios from "axios";
import { User } from "../components/friendsSearch";

export const useGetIds = async () => {
  let users: User[] = [];
  await axios.get(`api/users`).then(({ data }) => (users = data));
  const data: string[] = [];
  const data2: string[] = [];
  users.map((user: User) => {
    data.push(user.userId);
    const newD: string[] = [];
    hangul.d(user.userId, true).forEach((item) => {
      newD.push(item[0]);
    });
    data2.push(newD.join(""));
  });
  return { users, data, data2 };
};
