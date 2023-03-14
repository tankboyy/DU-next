export interface GameType {
	gameId: string;
	gameData: {
		[key: number]: {
			startTime: string
			userId: string
		}
	};
}


export interface NewReservedGameType {
	userId: string;
	targetGameIndex: number;
	targetGameName: string;
}
