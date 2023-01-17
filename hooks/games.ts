import { useQuery } from "react-query";
import axios from "axios";

export const useGetGameData = () => useQuery("gamesData", () => axios.get("api/game"), {
	staleTime: 60000,
});
