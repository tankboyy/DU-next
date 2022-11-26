import React, { useEffect, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import axios from "axios";
import { useGetIds } from "../hooks/useGetIds";
import UseBackDrop from "./useBackDrop";
import { useIdSearchToss } from "../hooks/useIdSearchToss";
import TimerComponent from "./timerComponent";

export interface User {
	created: string;
	friends: string[];
	userBirthDay: string;
	userGender: string;
	userId: string;
	userName: string;
	userNumber: string | null;
	userPw: string;
	userSchool: string;
}

export const gameNames = [
	"오락기",
	"축구",
	"컴퓨터",
	"탁구",
	"포켓볼",
	"플스",
	"충전",
	"책마루",
	"보드게임",
];

interface Tgame {
	startTime: string;
	userId: string;
}

export type Tgames = {
	id: string;
	users?: Tgame[];
};

export default function FriendsSearch() {
	const [friends, setFriends] = useState<string[]>([]);
	const [players, setPlayers] = useState<string[]>([]);
	const [cho, setCho] = useState<string[]>([]);
	const [gamesLoading, setGamesLoading] = useState(false);
	const [userData, setUserData] = useState<User[]>();
	const [userIds, setUserIds] = useState<string[]>([]);
	const [search, setSearch] = useState("");
	const [isStep, setIsStep] = useState(1);
	const [selectGame, setSelectGame] = useState<Tgames | null>(null);
	const [gameData, setGameData] = useState<Tgames[] | null>(null);
	const [checked, setChecked] = useState(false);
	const [backDrop, setBackDrop] = useState(false);
	const [arr, setArr] = useState<boolean[]>([]);
	const [loading, setLoading] = useState(false);

	const onTimeZero = () => {
		setIsStep(1)
		setPlayers([])
	}

	useEffect(() => {
		const {filIds} = useIdSearchToss({search, userData})
		setFriends(filIds);
	}, [search]);

	const getGamesData = async () => {
		setGamesLoading(true);
		let games: Tgames[];
		// await graphqlReq.request(GET_GAMES)
		await axios.get(`api/game`).then(({data}) => {
			games = data;
			games.push({id: "보드게임"}, {id: "책마루"});
			setGamesLoading(false);
			setGameData(games);
		});
	};

	useEffect(() => {
		setLoading(true);
		useGetIds().then(({users, data, data2}) => {
			setUserData(users);
			setUserIds(data);
			setCho(data2);
			setLoading(false);
		});
	}, []);

	const userSelection = (name: string) => {
		if (!players.includes(name)) setPlayers([...players, name]);
		else {
			const newData = [...players];
			newData.splice(players.indexOf(name), 1);
			setPlayers(newData);
		}
	};

	const handleDelete = (friend: string) => {
		const index = players.findIndex((player) => player === friend);
		const newPlayers = [...players];
		newPlayers.splice(index, 1);
		setPlayers(newPlayers);
	};

	const onClickStepDown = () => {
		setIsStep(isStep - 1);
	};
	const onClickStepUp = () => {
		setIsStep(isStep + 1);
		getGamesData();
	};

	const onClickButton = (name: string) => {
		gameData?.map((item) => {
			if (item.id === name) {
				setSelectGame(item);
			}
		});
	};

	if (isStep === 2 && players.length === 0) {
		setIsStep(1);
		setSearch("");
	}

	const onReverse = async () => {
		setBackDrop(true);
		setChecked(false);
		if (selectGame!.id === "책마루" || selectGame!.id === "보드게임") {
			axios
				.post(`api/game/boardG`, {
					name: selectGame!.id,
					userIds: [...players],
				})
				.then(() => {
					setBackDrop(false);
					setArr([]);
					setPlayers([]);
					alert("예약 성공!");
					setSelectGame(null);
					setChecked(false);
				})
				.catch(() => {
					setBackDrop(false);
					alert("관리자한테 문의하세요");
				});
		} else {
			axios
				.post(`api/game/resG`, {
					name: selectGame!.id,
					userIds: [...players],
					select: arr,
				})
				.then(() => {
					setBackDrop(false);
					setPlayers([]);
					alert("예약 성공!");
					setSelectGame(null);
					arr.map((item, i) => {
						if (!item) arr[i] = false;
					});
					axios.post(`api/logs/addlog`, {
						gameName: selectGame!.id,
						userId: [...players],
						select: arr,
					});
				})
				.catch((err) => {
					alert("하루에 한 번만 하실 수 있습니다.");
					setBackDrop(false);
					setArr([]);
				});
		}
	};

	function handleClose() {
		setArr([]);
		setChecked(false);
		setSelectGame(null);
	}

	return (
		<div style={{marginTop: 20}}>
			{loading ? (
				<div>로딩중...</div>
			) : (
				<div>
					{isStep === 1 && (
						<Step1
							setFriends={setFriends}
							userIds={userIds}
							cho={cho}
							friends={friends}
							userSelection={userSelection}
							onClickStepUp={onClickStepUp}
							players={players}
							handleDelete={handleDelete}
							search={search}
							setSearch={setSearch}
						/>
					)}
					{isStep === 2 && (
						<div>
							<TimerComponent setIsStep={setIsStep} setSearch={setSearch} setPlayers={setPlayers}/>
							<Step2
								arr={arr}
								checked={checked}
								gameData={gameData}
								setArr={setArr}
								setGameData={setGameData}
								setChecked={setChecked}
								players={players}
								handleDelete={handleDelete}
								onClickStepDown={onClickStepDown}
								gamesLoading={gamesLoading}
								handleClose={handleClose}
								onClickButton={onClickButton}
								selectGame={selectGame}
								setSelectGame={setSelectGame}
								onReverse={onReverse}
							/>
						</div>
					)}
				</div>
			)}
			<UseBackDrop bdOpen={backDrop}/>
		</div>
	);
}
