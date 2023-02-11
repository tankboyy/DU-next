import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type dataType = {
	name: string
	userIds: string[]
	select?: boolean[]
}

const gameReserved = (data: dataType) => axios.post('api/game/resG', {
	name: data.name,
	userIds: data.userIds,
	select: data.select
})

const boardGameReserved = (data: dataType) => axios.post('api/game/resG', {
	name: data.name,
	userIds: data.userIds,
})

export const useGetGamesData = () => useQuery(["gamesData"], () => axios.get("api/game"), {
	staleTime: 60000,
});

export const useMutationBoardGame = () => {
	const queryClient = useQueryClient();
	return useMutation((data: dataType) => boardGameReserved(data), {
		onSuccess: () => {
			console.log("hi, boardGame")
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
