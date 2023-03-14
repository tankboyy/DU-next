import axios from "axios";
import { chosungIncludes, hangulIncludes } from "@toss/hangul";

type IdSearchType = {
  userData: any[];
  cho: string;
};

export const useIdSearchToss = (props: {
  search: string;
  userData: any[] | undefined;
}) => {
  const users = props.userData;
  const arr: any[] = [];
  const filIds: string[] = [];
  if (props.search !== "") {
    users!.forEach((user) => {
      if (
        chosungIncludes(user.userId, props.search) ||
        hangulIncludes(user.userId, props.search)
      ) {
        arr.push(user);
        filIds.push(user.userId);
      }
    });
  }
  return { arr, filIds };
};
