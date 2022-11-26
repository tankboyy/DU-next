import React from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	Chip,
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack
} from "@mui/material";
import GameView from "./gameView";
import { gameNames, Tgames } from "./friendsSearch";
import TimerComponent from './timerComponent';

interface Step2 {
	onClickStepDown(): void;

	handleDelete(friend: string): void;

	onClickButton(name: string): void;

	checked: boolean;
	setChecked: React.Dispatch<React.SetStateAction<boolean>>;
	setArr: React.Dispatch<React.SetStateAction<boolean[]>>;

	onReverse(): Promise<void>;

	handleClose(): void;

	selectGame: Tgames | null;
	setSelectGame: React.Dispatch<React.SetStateAction<Tgames | null>>;
	setGameData: React.Dispatch<React.SetStateAction<Tgames[] | null>>;
	gameData: Tgames[] | null;
	arr: boolean[];
	gamesLoading: boolean;
	players: string[];

}

function Step2(props: Step2) {
	return (
		<div>
			{props.gamesLoading ? <div>로딩중...</div> :
				<div>
					<Stack direction="row" spacing={1} sx={{mt: 1, display: "flex", justifyContent: "center"}}>
						{props.players &&
							props.players.map((friend, i) => (
								<Chip key={i} label={friend} variant="outlined" onDelete={() => props.handleDelete(friend)}/>
							))
						}
					</Stack>
					<div style={{display: "flex", justifyContent: "center"}}>
						<div>
						</div>
						<Box sx={{width: 500, display: "flex", justifyContent: "center", mt: 2}}>
							<Button sx={{ml: 1}} variant="outlined" size="medium" onClick={props.onClickStepDown}>
								이전
							</Button>
							<ButtonGroup variant="text">
								{gameNames.map(name => (
									<Button key={name} onClick={() => props.onClickButton(name)} sx={{width: 80}}>{name}</Button>
								))}
							</ButtonGroup>
							<Button sx={{flexDirection: "row-end"}} disabled={!props.checked} variant="outlined" size="medium"
											onClick={props.onReverse}>
								예약
							</Button>
						</Box>
						<Dialog
							open={props.checked}
							onClose={props.handleClose}
						>
							<DialogTitle id="alert-dialog-title">
								{"이대로 예약하시겠습니까?"}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									<div>
										선택된 게임 : {props.selectGame?.id}
									</div>
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={props.handleClose}>취소</Button>
								<Button onClick={props.onReverse} autoFocus>
									예약하기
								</Button>
							</DialogActions>
						</Dialog>
					</div>
					{props.selectGame &&
						<div style={{display: "flex", justifyContent: "center", marginTop: 10}}>
							{props.gameData?.length === 0 ? <div>로딩중...</div> :
								<GameView key={props.selectGame.id} arr={props.arr}
													setArr={props.setArr}
													setGameData={props.setGameData}
													setChecked={props.setChecked} players={props.players} data={props.selectGame}/>
							}
						</div>
					}
				</div>
			}
		</div>
	);
}

export default Step2;
