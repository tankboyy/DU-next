import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GAMETYPE } from "../../components/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";

type dataType = {
	name: string
	userIds: string[]
	select?: boolean[]
}

type soloDataType = {name: string, gameNumber: number, userId: string}

const gameReserved = (data: dataType) => axios.post('api/game/resG', {
	name: data.name,
	userIds: data.userIds,
	select: data.select
})

export const resSoloGame = (data: soloDataType) => axios.post('api/game/resSoloG', {
	name: data.name,
	userId: data.userId,
	gameNumber: data.gameNumber
})

export const boardGameReserved = (data: dataType) => axios.post('api/game/resG', {
	name: data.name,
	userIds: data.userIds,
})

export const useGetGamesData = () => useQuery(["gamesData"], (): Promise<GAMETYPE[]> => axios.get("api/game").then((data) => data.data), {
	refetchOnWindowFocus: true,
	onSuccess: () => console.log("useQuery 성공!")
});

export const useMutationBoardGame = () => {
	const queryClient = useQueryClient();
	return useMutation((data: dataType) => boardGameReserved(data), {
		onSuccess: () => {
			console.log("hi, boardGame")
		}
	})
}

export const useResSoloGame = () => {
	return useMutation((data: soloDataType) => resSoloGame(data), {
		onSuccess: async () => {
			console.log("soloGame successzz")
		}
	})
}

export const useMutationGame = () => {
	const queryClient = useQueryClient();

	return useMutation((data: dataType) => gameReserved(data), {
		onSuccess: () => {
			queryClient.resetQueries(["gamesData"])
				// queryClient.invalidateQueries("gamesData")
				.then(() => {
					console.log("hi, game")
				})
		}
	})
}

