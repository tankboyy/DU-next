import React, { useEffect, useState } from "react";
import AdminGameList from "./adminGameList";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { GAMETYPE } from "../types";

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

	async function getGames() {
		return await axios.get(`api/game`).then(({data}) => {
			return data
		})
	}

	async function getGames2() {
		setLoading(true)
		axios.get(`api/game`)
			.then(({data}) => {
				let newData: Tgames
				data.map((item: GAMETYPE) => {
					newData = {...newData, [item.id]: item}
				})
				setGames(newData!)
				setLoading(false)
			})
	}


	useEffect(() => {
		const getDatas = () => {
			setTimeout(() => {
				getGames().then(data => {
					let newData: Tgames
					data.map((item: GAMETYPE) => {
						newData = {...newData, [item.id]: item}
					})
					setGames(newData!)
				})
			}, 60000)
		}
		console.log("60000", new Date())
		return () => getDatas()
	}, [games]);


	useEffect(() => {
		getGames().then(data => {
			let newData: Tgames
			data.map((item: GAMETYPE) => {
				newData = {...newData, [item.id]: item}
			})
			setGames(newData!)
		})
	}, [])

	const handleChangeClick = () => {

	}

	return (
		<div>
			불러온 시간: {new Date().getHours()}시 {new Date().getMinutes()}분 {new Date().getSeconds()}초
			<Button variant="text" onClick={getGames2}>
				<AutorenewIcon/>
			</Button>
			{props.setAdmin1 ? <div>
				<button onClick={handleChangeClick}>수정</button>
			</div> : null}
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
									{/*<AdminGameList gameData={games.c} gamesData={} setGames={}*/}
									{/*{games?.map((game: GAMETYPE) => (*/}
									{/*	<AdminGameList key={game.id} gameData={game} gamesData={games} setGames={setGames}/>*/}
									{/*))}*/}
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
