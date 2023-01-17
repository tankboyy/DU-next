import React, { useEffect, useState } from "react";
import AdminGameList from "./adminGameList";
import { Grid } from "@mui/material";
import axios from "axios";
import { GAMETYPE } from "../types";
import { useQuery } from "react-query";
import { useGetGameData } from "../../hooks/games";
import { queryClient } from "../../pages/_app";

export type Tgames = {
	탁구: GAMETYPE
	플스: GAMETYPE
	컴퓨터: GAMETYPE
	오락기: GAMETYPE
	축구: GAMETYPE
	포켓볼: GAMETYPE
	충전: GAMETYPE
	스위치: GAMETYPE
	노래방: GAMETYPE
}

interface P {
	setAdmin1: boolean
}

const AdminGame: React.FC<P> = (props) => {
	const [games, setGames] = useState<Tgames>()
	const [loading, setLoading] = useState(false)




	// const gamesQuery = useQuery("gamesData", () => getGames(), {
	// 	staleTime: 60000,
	// 	onSuccess: (data) => {
	// 		console.log(data)
	// 		let newData: Tgames
	// 		data.map((item: GAMETYPE) => {
	// 			newData = {...newData, [item.id]: item}
	// 		})
	// 		setGames(newData!);
	// 	}
	// })

	const data = useGetGameData();
	console.log(data)

	useEffect(() => {
		console.log("useEffect")
		if (queryClient.getQueryState("gamesData")?.status === "success") {
			// @ts-ignore
			const {data}: {data: GAMETYPE[] | undefined} = queryClient.getQueryData("gamesData");
			console.log(data)
			let newData: Tgames;
			data?.map((item: GAMETYPE) => {
				newData = {...newData, [item.id]: item};
			})
			setGames(newData!);
		}
	}, [queryClient.getQueryState("gamesData")?.status])

	return (
		<div>
			불러온 시간: {new Date().getHours()}시 {new Date().getMinutes()}분 {new Date().getSeconds()}초
			{loading ? <div>로딩중...</div> :
				<div>
					{games ?
						<div>
							<div>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.컴퓨터} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.플스} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.탁구} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.축구} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.오락기} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.포켓볼} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.스위치} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={6}>
										<AdminGameList gameData={games!.노래방} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
									<Grid item xs={6} md={10}>
										<AdminGameList gameData={games!.충전} gamesData={games!} setGames={setGames}
																	 setAdmin={props.setAdmin1}/>
									</Grid>
								</Grid>
								<div>
								</div>


							</div>

						</div> :
						null
					}
				</div>
			}
		</div>
	)
}

export default AdminGame;
