// import GameView from "../components/admin/gameView";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { GAMETYPE } from "../components/types";
// import GameDataInfo from "../components/admin/gameDataInfo";
// import { buttonClasses } from "@mui/material";
// import { useQueries, useQuery } from "react-query";
// import { queryClient } from "./_app";
//
//
// export default function game() {
//
// 	const [gamesData, setGamesDatas] = useState<GAMETYPE[]>();
//
//
// 	useEffect(() => {
// 		(async function getGames() {
// 			const {data} = await axios.get(`api/game`)
// 			setGamesDatas(data)
// 		})();
//
// 	}, [])
//
// 	const gamesQuery = useQuery("gamesData", () => axios.get('api/game'), {
// 		refetchOnWindowFocus: true,
// 		retry: 1,
// 		staleTime: 60000,
// 		// cacheTime: 1000,
// 		onSuccess: data => {
// 			console.log(data)
// 		},
// 		onError: e => {
// 			console.error(e)
// 		}
// 	});
//
// 	// const result = useQueries([
// 	// 	{
// 	// 		queryKey: ["games"],
// 	// 		queryFn: () => axios.get('api/game')
// 	// 	},
// 	// 	{
// 	// 		queryKey: ["users"],
// 	// 		queryFn: () => axios.get('api/users')
// 	// 	}
// 	// ])
//
// 	return (
// 		<>
// 			<button className="border-8" onClick={() => console.log(queryClient.getQueryData('gamesData'))}>asd</button>
// 			<section className="text-gray-600 body-font">
// 				<div className="container px-5 py-24 mx-auto">
// 					<div className="flex flex-wrap -m-4">
// 						{!gamesData || gamesData.map((game, i) => (
// 							<div className="xl:w-1/3 md:w-1/2 p-4">
// 								<div className="border border-gray-200 p-6 rounded-lg">
//
// 									<h2 className="text-lg text-gray-900 font-medium title-font mb-2">{game.id}</h2>
// 									<GameDataInfo gamesData={game}/>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</section>
// 		</>
// 	)
// }
//
