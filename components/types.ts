export type Tgame = {
	userId: string
	startTime: string
}


export type Tuser = {
	userGender: string
	userId: string
	userName: string
	userPw: string
	userPw2: string
	userSchool: string
	userBirthDay: string
}

export type USERSTYPE = {
	userId: string
	startTime: string
}

export type GAMETYPE = {
	id: string
	users: USERSTYPE[]
}

export type GAMESTYPE = {
	games: GAMETYPE[]
}

export type Texcelobj = {
	일자: string,
	컴퓨터: number,
	플스: number,
	포켓볼: number,
	농구게임: number,
	축구: number,
	오락기: number,
	보드게임: number,
	책마루: number,
	탁구: number,
	핸드폰충전: number,
	신규가입: number,
	총수: number,
	어울림터연인원: number,
	어울림터실인원: number,
	정남: number,
	정여: number,
	책남: number,
	책여: number,
	어남: number,
	어여: number,
	노남: number,
	노여: number,
}
