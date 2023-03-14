import axios, { AxiosResponse } from "axios";
import { GAMETYPE } from "../../components/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GameType, NewReservedGameType } from "../../types/game";

type dataType = {
	name: string
	userIds: string[]
	select?: boolean[]
}

type soloDataType = {name: string, gameNumber: number, userId: string}

const gameReserved = (data: dataType) => axios.post("api/game/resG", {
	name: data.name,
	userIds: data.userIds,
	select: data.select
});

export const resSoloGame = (data: soloDataType) => axios.post("api/game/resSoloG", {
	name: data.name,
	userId: data.userId,
	gameNumber: data.gameNumber
});

export const boardGameReserved = (data: dataType) => axios.post("api/game/boardG", {
	name: data.name,
	userIds: data.userIds
});

const newReservedGame = (data: NewReservedGameType) => axios.post("api/game/newReservedGame", data);

export const useGetGamesData = () => useQuery("gamesData", (): Promise<GameType[]> => axios.get("api/game/newGetGames").then((data) => data.data), {
	refetchOnWindowFocus: true,
	onSuccess: (data) => {
		console.log(data);
		console.log("useQuery 성공!");
	},
	onError: (err) => {
		console.log("err", err);
	}
});

export const useMutationNewReservedGame = () => {
	const queryClient = useQueryClient();
	return useMutation((data: NewReservedGameType) => newReservedGame(data), {
		onSuccess: () => {
			console.log("hi, newReservedGame");
		}
	});
};

export const useMutationBoardGame = () => {
	const queryClient = useQueryClient();
	return useMutation((data: dataType) => boardGameReserved(data), {
		onSuccess: () => {
			console.log("hi, boardGame");
		}
	});
};

export const useResSoloGame = () => {
	return useMutation((data: soloDataType) => resSoloGame(data), {
		onSuccess: async () => {
			console.log("soloGame successzz");
		}
	});
};

export const useMutationGame = () => {
	const queryClient = useQueryClient();

	return useMutation((data: dataType) => gameReserved(data), {
		onSuccess: () => {
			queryClient.resetQueries(["gamesData"])
				// queryClient.invalidateQueries("gamesData")
				.then(() => {
					console.log("hi, game");
				});
		}
	});
};

